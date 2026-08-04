from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    app_name: str = "AI Ecommerce OS"

    openai_api_key: str = ""

    shopify_store_domain: str = ""
    shopify_admin_api_token: str = ""

    database_url: str = "sqlite:///data/store.db"

    host: str = "127.0.0.1"
    port: int = 8000

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()