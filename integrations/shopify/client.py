import httpx

from core.config import settings


class ShopifyClient:
    def __init__(self):
        self.store_domain = settings.shopify_store_domain
        self.token = settings.shopify_admin_api_token
        self.api_version = "2024-10"

    @property
    def base_url(self) -> str:
        return f"https://{self.store_domain}/admin/api/{self.api_version}"

    def is_configured(self) -> bool:
        return bool(self.store_domain and self.token)

    async def get_shop_info(self) -> dict:
        if not self.is_configured():
            return {
                "configured": False,
                "message": "Shopify credentials are not configured yet.",
            }

        headers = {
            "X-Shopify-Access-Token": self.token,
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(f"{self.base_url}/shop.json", headers=headers)
            response.raise_for_status()
            return response.json()