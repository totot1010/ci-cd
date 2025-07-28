FROM python:3.11-slim

WORKDIR /app

# システムパッケージのインストール
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Python依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードのコピー
COPY . .

EXPOSE 8000

# デフォルトは開発環境
ENV ENV=development

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
