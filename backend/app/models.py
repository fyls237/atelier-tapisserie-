from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum
from datetime import datetime

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    ARTISAN = "artisan"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.ARTISAN)
    is_active = Column(Boolean, default=True)

    sales = relationship("Sale", back_populates="seller")
    expenses = relationship("Expense", back_populates="spender")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    image_url = Column(String)
    category = Column(String, index=True)
    stock = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)


class SaleStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"), nullable=True) # Optional link to product for custom orders
    description = Column(String) # Description if custom order
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(SaleStatus), default=SaleStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)

    seller = relationship("User", back_populates="sales")
    # For a simple MVP, we treat sales as single items or custom orders.
    # In V2, we can add a SaleItem table for multiple products per sale.


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    category = Column(String) # material, transport, salary, etc.

    spender = relationship("User", back_populates="expenses")
