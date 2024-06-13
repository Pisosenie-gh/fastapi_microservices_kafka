"""Edited id field

Revision ID: 47ee7f8d848b
Revises: 5c465f47eaac
Create Date: 2024-06-13 08:47:52.452050

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

# revision identifiers, used by Alembic.
revision = '47ee7f8d848b'
down_revision = '5c465f47eaac'
branch_labels = None
depends_on = None

def upgrade():
    # Step to convert the existing `id` column to `UUID`
    op.alter_column('profile', 'id', type_=UUID(as_uuid=True), postgresql_using="id::uuid")


def downgrade():
    # If you need to downgrade, specify the type conversion back
    op.alter_column('profile', 'id', type_=sa.String())
