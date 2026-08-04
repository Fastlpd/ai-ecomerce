from pydantic import BaseModel, Field
from typing import List, Optional


class Product(BaseModel):
    id: Optional[str] = None

    title: str = Field(..., min_length=3)
    description: str

    niche: str
    category: str

    price: float
    cost: float = 0.0

    currency: str = "USD"

    supplier: Optional[str] = None
    supplier_url: Optional[str] = None

    images: List[str] = []

    tags: List[str] = []

    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

    status: str = "draft"

    ai_score: float = 0.0
    demand_score: float = 0.0
    competition_score: float = 0.0

    created_by: str = "AI Ecommerce OS"