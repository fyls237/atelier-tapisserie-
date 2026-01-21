from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Any
from datetime import datetime

from .. import models, schemas, database
from ..dependencies import get_current_active_user

router = APIRouter(
    prefix="/finance",
    tags=["finance"],
    dependencies=[Depends(get_current_active_user)] # Tout le module est protégé
)

# --- SALES ---

@router.post("/sales/", response_model=schemas.SaleResponse)
def create_sale(
    sale: schemas.SaleCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    # 1. Gestion du produit et stock
    if sale.product_id:
        product = db.query(models.Product).filter(models.Product.id == sale.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Décrémentation Stock
        if product.stock >= sale.quantity:
            product.stock -= sale.quantity
        else:
            # On autorise la vente même si stock insuffisant pour la tréso, mais on log ou on pourrait bloquer
            # Pour l'instant on laisse passer en négatif ou on met à 0 ? Restons simples: on décrémente.
            product.stock -= sale.quantity
        
        # Auto-fill description if empty
        if not sale.description:
            sale.description = f"Vente: {sale.quantity}x {product.name}"
    
    # 2. Création Vente
    db_sale = models.Sale(
        user_id=current_user.id,
        product_id=sale.product_id,
        description=sale.description or "Vente diverse",
        total_amount=sale.total_amount,
        status=schemas.SaleStatus.COMPLETED,
        created_at=sale.created_at or datetime.utcnow()
    )
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

# --- EXPENSES ---

@router.post("/expenses/", response_model=schemas.ExpenseResponse)
def create_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    db_expense = models.Expense(
        user_id=current_user.id,
        amount=expense.amount,
        description=expense.description,
        category=expense.category,
        date=expense.date or datetime.utcnow()
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

# --- STATS ---

@router.get("/stats/")
def get_finance_stats(
    db: Session = Depends(database.get_db)
):
    # 1. KPI Globaux (Sommes)
    total_sales = db.query(func.sum(models.Sale.total_amount)).scalar() or 0.0
    total_expenses = db.query(func.sum(models.Expense.amount)).scalar() or 0.0
    balance = total_sales - total_expenses

    # 2. Historique Mixte (5 derniers)
    # C'est un peu tricky en SQL pur de mixer deux tables et trier.
    # On va faire simple : récupérer 5 derniers de chaque, mixer en Python et renvoyer les 5 plus récents.
    
    last_sales = db.query(models.Sale).order_by(desc(models.Sale.created_at)).limit(5).all()
    last_expenses = db.query(models.Expense).order_by(desc(models.Expense.date)).limit(5).all()

    transactions = []
    
    for s in last_sales:
        transactions.append({
            "type": "sale",
            "id": s.id,
            "date": s.created_at,
            "amount": s.total_amount,
            "description": s.description,
            "category": "Vente"
        })
    
    for e in last_expenses:
        transactions.append({
            "type": "expense",
            "id": e.id,
            "date": e.date,
            "amount": e.amount, # On pourrait mettre en négatif pour l'affichage
            "description": e.description,
            "category": e.category or "Dépense"
        })

    # Trier par date décroissante et prendre les 5 premiers
    transactions.sort(key=lambda x: x['date'], reverse=True)
    recent_transactions = transactions[:10] # Disons 10

    return {
        "total_revenue": total_sales,
        "total_expenses": total_expenses,
        "balance": balance,
        "recent_transactions": recent_transactions
    }
