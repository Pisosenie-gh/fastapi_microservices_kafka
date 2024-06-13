from uuid import UUID
from pydantic import BaseModel
from datetime import datetime


class ProfileBase(BaseModel):
    name: str | None
    lastname: str | None
    birthday: datetime | None
    profile_picture_url: str | None

    class Config:
        from_attributes = True


class ProfileResponse(ProfileBase):
    id: UUID
    user_id: str
    created_at: datetime
    updated_at: datetime


class ProfileUpdate(ProfileBase):
    ...
