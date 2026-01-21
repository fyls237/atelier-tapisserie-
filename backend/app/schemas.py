from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import UserRole, SaleStatus

# --- USER SCHEMAS ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.ARTISAN
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True

# --- PRODUCT SCHEMAS ---
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category: Optional[str] = None
    stock: int = 0
    is_active: bool = True

class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True

# --- SALE SCHEMAS ---
class SaleBase(BaseModel):
    total_amount: float
    description: Optional[str] = None
    status: SaleStatus = SaleStatus.PENDING
    product_id: Optional[int] = None

class SaleCreate(SaleBase):
    quantity: int = 1
    created_at: Optional[datetime] = None

class SaleResponse(SaleBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- EXPENSE SCHEMAS ---
class ExpenseBase(BaseModel):
    amount: float
    description: str
    category: Optional[str] = None
    date: datetime = None # Allow default but can be overridden

class ExpenseCreate(ExpenseBase):
     date: Optional[datetime] = None

class ExpenseResponse(ExpenseBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
