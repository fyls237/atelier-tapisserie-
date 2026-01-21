from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil
import uuid
import os
from ..database import get_db
from ..models import Product, User
from ..schemas import ProductCreate, ProductResponse, ProductUpdate
from ..dependencies import get_current_admin_user

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

# Configuration dossier images
IMAGES_DIR = "app/static/images"
os.makedirs(IMAGES_DIR, exist_ok=True)

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    name: str = Form(...),
    price: float = Form(...),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    stock: int = Form(0),
    file: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    image_url = None
    if file:
        # Générer un nom de fichier unique
        file_extension = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4()}.{file_extension}"
        file_path = os.path.join(IMAGES_DIR, file_name)
        
        # Sauvegarde sur le disque
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # URL accessible (Static monté sur /static)
        image_url = f"/static/images/{file_name}"

    new_product = Product(
        name=name,
        description=description,
        price=price,
        image_url=image_url,
        category=category,
        stock=stock,
        is_active=True
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get("/", response_model=List[ProductResponse])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_active == True).offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductResponse)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Soft delete (désactivation) ou hard delete ?
    # Ici on fait un Hard Delete pour simplifier, ou Soft delete si on toggle is_active
    # Si image associée, on pourrait la supprimer du disque aussi.
    
    db.delete(product)
    db.commit()
    return None
