"""
ステージング環境用の設定
"""
from .base import *
from decouple import config

DEBUG = False

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="staging.example.com").split(",")

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DATABASE_NAME", default="staging_todoapp"),
        "USER": config("DATABASE_USER"),
        "PASSWORD": config("DATABASE_PASSWORD"),
        "HOST": config("DATABASE_HOST"),
        "PORT": config("DATABASE_PORT", default="5432"),
    }
}

# CORS設定
CORS_ALLOWED_ORIGINS = [
    "https://staging.example.com",
    "http://localhost:3000",  # 開発時のテスト用
]

# ログ設定 - ステージングでは詳細なログを出力
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "django": {
        "handlers": ["console"],
        "level": "DEBUG",
        "propagate": False,
    },
}
