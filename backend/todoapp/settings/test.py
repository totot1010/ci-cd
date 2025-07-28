"""
テスト環境用の設定
"""
from .base import *
import os

# テスト時はDEBUGをFalseに
DEBUG = False

ALLOWED_HOSTS = ["testserver", "localhost", "127.0.0.1"]

# テスト用のデータベース設定
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DB", "postgres"),
        "USER": os.getenv("POSTGRES_USER", "postgres"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD", "postgres"),
        "HOST": os.getenv("POSTGRES_HOST", "localhost"),
        "PORT": os.getenv("POSTGRES_PORT", "5432"),
    }
}

# CORS設定
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://testserver",
]

# テスト時のパスワードハッシュを高速化
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

# ログレベルを下げる
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
        "level": "WARNING",
    },
}
