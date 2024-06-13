from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from app.schemas.profiles import ProfileResponse
from app.models import Profile as ProfileModel
from app.api.deps import get_session
from sqlalchemy.ext.asyncio import AsyncSession

profile_router = APIRouter()

@profile_router.get("/{profile_id}", response_model=ProfileResponse)
async def get_profile_by_id(profile_id: str, session: AsyncSession = Depends(get_session)):
    """
    Retrieves a profile by its ID.

    Args:
        profile_id (str): The ID of the profile to retrieve.

    Returns:
        ProfileResponse: The profile object matching the provided ID.

    Raises:
        HTTPException: If the profile with the given ID is not found in the database.
    """
    profile = await session.get(ProfileModel, profile_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return profile


@profile_router.get("/", response_model=List[ProfileResponse])
async def get_profiles(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(ProfileModel))
    profiles = result.scalars().all()
    if profiles:
        return profiles
    raise HTTPException(status_code=404, detail="Profiles not found")