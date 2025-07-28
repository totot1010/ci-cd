"""
環境に応じた設定ファイルを自動的に選択
"""
import os

env = os.environ.get('DJANGO_ENV', 'development')

if env == 'production':
    from todoapp.settings.production import *
elif env == 'staging':
    from todoapp.settings.staging import *
elif env == 'test':
    from todoapp.settings.test import *
else:
    from .development import *
