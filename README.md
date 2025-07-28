# ToDo App with CI/CD Pipeline

このプロジェクトは、React/TypeScript（フロントエンド）とDjango（バックエンド）で構築された簡易ToDoアプリケーションです。

## アーキテクチャ

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────┐
│   Frontend      │────▶│    Backend      │────▶│  PostgreSQL  │
│  React/TS       │     │    Django       │     │   Database   │
│  (Local)        │     │  Port: 8000     │     │  Port: 5432  │
└─────────────────┘     └─────────────────┘     └──────────────┘
```

## 技術スタック

### バックエンド
- Django 4.2.7
- Django REST Framework
- PostgreSQL
- pytest（テスト）
- flake8, black（Lint/Format）

### フロントエンド
- React 18
- TypeScript
- Jest（テスト）
- ESLint, Prettier（Lint/Format）

### インフラ
- Docker & Docker Compose（バックエンドのみ）
- GitHub Actions（CI/CD）

## セットアップ手順

### 前提条件
- Docker Desktop
- Node.js 18以上（フロントエンド用）
- Make（オプション）
- Git

### 初期セットアップ

1. リポジトリをクローン
```bash
git clone <repository-url>
cd ci-cd
```

2. バックエンドのセットアップ
```bash
cd backend
cp .env.example .env
make setup
```

または手動でセットアップ：
```bash
cd backend
docker-compose build
docker-compose up -d
docker-compose exec app python manage.py makemigrations
docker-compose exec app python manage.py migrate
```

3. フロントエンドのセットアップ
```bash
cd frontend
npm install
cp .env.example .env.local
npm start
```

4. 管理者ユーザーを作成（任意）
```bash
cd backend
make createsuperuser
```

### アクセスURL
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/

## 開発コマンド

### バックエンド（backend/ディレクトリで実行）
```bash
make up          # コンテナ起動
make down        # コンテナ停止
make restart     # コンテナ再起動
make logs        # ログ表示
make test        # テスト実行
make lint        # Lint実行
make format      # コードフォーマット
make shell       # appコンテナに入る
make shell-db    # PostgreSQLに接続
make migrate     # マイグレーション実行
make clean       # 全削除（注意）
```

### フロントエンド（frontend/ディレクトリで実行）
```bash
npm start        # 開発サーバー起動
npm test         # テスト実行
npm run build    # ビルド
npm run lint     # Lint実行
npm run format   # コードフォーマット
```

## プロジェクト構造

```
ci-cd/
├── backend/               # Djangoバックエンド
│   ├── todoapp/          # Djangoプロジェクト設定
│   ├── todos/            # ToDoアプリケーション
│   ├── requirements.txt  # Python依存関係
│   ├── Dockerfile        
│   ├── docker-compose.yml # Docker構成
│   └── Makefile          # バックエンド用コマンド
├── frontend/             # Reactフロントエンド
│   ├── src/             # ソースコード
│   ├── public/          # 静的ファイル
│   └── package.json     # Node依存関係
└── .github/workflows/   # CI/CDパイプライン
```

## API エンドポイント

- `GET /api/todos/` - ToDo一覧取得
- `POST /api/todos/` - ToDo作成
- `GET /api/todos/{id}/` - ToDo詳細取得
- `PATCH /api/todos/{id}/` - ToDo更新
- `DELETE /api/todos/{id}/` - ToDo削除

## トラブルシューティング

### ポートが使用中の場合
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :8000
lsof -i :5432

# プロセスを終了
kill -9 <PID>
```

### データベース接続エラー
```bash
# コンテナを再起動
make restart

# ログを確認
make logs
```

### 依存関係の更新
```bash
# バックエンド
cd backend
docker-compose exec app pip install -r requirements.txt

# フロントエンド
cd frontend
npm install
```
