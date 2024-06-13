from app.core.database import SessionLocal


async def get_session() -> SessionLocal:
    async with SessionLocal() as session:
        yield session
