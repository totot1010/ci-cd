.PHONY: help build up down restart logs shell clean test lint format

help: ## ヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Dockerイメージをビルド
	docker-compose build

up: ## コンテナを起動
	docker-compose up -d

down: ## コンテナを停止
	docker-compose down

restart: down up ## コンテナを再起動

logs: ## ログを表示
	docker-compose logs -f

shell: ## appコンテナのシェルに入る
	docker-compose exec app /bin/bash

shell-db: ## DBコンテナのシェルに入る
	docker-compose exec db psql -U todouser -d todoapp

migrate: ## データベースマイグレーションを実行
	docker-compose exec app python manage.py makemigrations
	docker-compose exec app python manage.py migrate

createsuperuser: ## Django管理者ユーザーを作成
	docker-compose exec app python manage.py createsuperuser

test: ## テストを実行
	docker-compose exec app pytest

lint: ## Lintを実行
	docker-compose exec app flake8

format: ## コードをフォーマット
	docker-compose exec app black .

clean: ## コンテナ、ボリューム、イメージを削除
	docker-compose down -v --remove-orphans
	docker system prune -f

setup: build up migrate ## 初期セットアップ（ビルド、起動、マイグレーション）
	@echo "セットアップが完了しました！"
	@echo "バックエンド: http://localhost:8000"
	@echo "Django Admin: http://localhost:8000/admin"