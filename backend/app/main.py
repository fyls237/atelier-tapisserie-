from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
import os
from .database import engine, SessionLocal, Base
from .routers import auth
from .models import User, UserRole
from .security import get_password_hash

# --- LIFESPAN (Startup logic) ---
# Remplace l'ancien @app.on_event("startup")
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Création des tables
    Base.metadata.create_all(bind=engine)
    
    # 2. Création de l'Admin par défaut si inexistant
    db = SessionLocal()
    try:
        first_superuser_email = os.getenv("FIRST_SUPERUSER", "admin@example.com")
        first_superuser_password = os.getenv("FIRST_SUPERUSER_PASSWORD", "admin")
        
        user = db.query(User).filter(User.email == first_superuser_email).first()
        if not user:
            print(f"INFO: Création du superutilisateur {first_superuser_email}")
            admin_user = User(
                email=first_superuser_email,
                hashed_password=get_password_hash(first_superuser_password),
                full_name="Admin Principal",
                role=UserRole.ADMIN,
                is_active=True
            )
            db.add(admin_user)
            db.commit()
        else:
            print(f"INFO: Superutilisateur {first_superuser_email} existe déjà.")
    finally:
        db.close()
        
    yield
    # Shutdown logic if needed

app = FastAPI(
    title="Atelier Tapisserie API",
    description="API de gestion pour l'atelier de menuiserie/tapisserie",
    version="1.0.0",
    lifespan=lifespan
)

# --- ROUTERS ---
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de l'Atelier Tapisserie"}
