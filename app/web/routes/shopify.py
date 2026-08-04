from fastapi import APIRouter

from integrations.shopify.client import ShopifyClient

router = APIRouter(prefix="/shopify", tags=["Shopify"])


@router.get("/status")
async def shopify_status():
    client = ShopifyClient()

    return {
        "configured": client.is_configured(),
        "store": client.store_domain or "Not configured",
    }