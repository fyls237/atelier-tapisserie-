from app.database import SessionLocal, engine
from sqlalchemy import text
import sys

def test_connection():
    try:
        # Tentative de connexion
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        print("\n✅ CONNEXION RÉUSSIE À LA BASE DE DONNÉES !")
        print(f"   URL: {engine.url}")
        db.close()
    except Exception as e:
        print("\n❌ ÉCHEC DE LA CONNEXION :")
        print(e)
        sys.exit(1)

if __name__ == "__main__":
    test_connection()
