from sqlalchemy import Boolean, Column, Integer, String

from app.models.base import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, unique=True)
    username = Column(String, index=True, unique=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
