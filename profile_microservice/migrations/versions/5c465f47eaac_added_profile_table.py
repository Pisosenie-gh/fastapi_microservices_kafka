"""Added profile table

Revision ID: 5c465f47eaac
Revises: 
Create Date: 2024-06-12 10:34:27.629220

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c465f47eaac'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('profile',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('name', sa.Text(), nullable=True),
    sa.Column('lastname', sa.Text(), nullable=True),
    sa.Column('birthday', sa.DateTime(), nullable=True),
    sa.Column('profile_picture_url', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_profile_id'), 'profile', ['id'], unique=False)
    op.create_index(op.f('ix_profile_user_id'), 'profile', ['user_id'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_profile_user_id'), table_name='profile')
    op.drop_index(op.f('ix_profile_id'), table_name='profile')
    op.drop_table('profile')
    # ### end Alembic commands ###