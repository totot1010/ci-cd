# CI/CDサービス比較

## GitHub Actions

- 無料枠の有無
    
    あり、月に2000分。
    
    詳しくは以下。
    
    | **Plan** | **Storage** | **Minutes (per month)** |
    | --- | --- | --- |
    | GitHub Free | 500 MB | 2,000 |
    | GitHub Pro | 1 GB | 3,000 |
    | GitHub Free for organizations | 500 MB | 2,000 |
    | GitHub Team | 2 GB | 3,000 |
    | GitHub Enterprise Cloud | 50 GB | 50,000 |
    
    ※. publicリポジトリは無料
    
- セットアップのしやすさ
    - yamlファイルをリポジトリに置く
- ログやデバッグのしやすさ
    - GUIで視認性が高い
    - ステップ単位で実行結果をストリーミングできる
    - 再実行もボタン1つで容易
- デプロイまでの柔軟性
    - Marketplace Actionが豊富でカスタマイズ可能

### メリット

- GitHubとの統合

## GitLab CI

- 無料枠の有無
    - ある、5ユーザーで月400分まで
- セットアップのしやすさ
    - GUIから登録
- ログやデバッグのしやすさ
    - ローカルでGitLab Runnerをインストールしてターミナルからテスト実行できる
        - ステップバイステップで確認できる
- デプロイまでの柔軟性
    - Market PlaceがGitHub Actionsに比べて豊富ではない
    - そのほかはActionsとさほど変わらない

## Circle CI

- 無料枠の有無
    - ある。6000クレジット=月1000分
- セットアップのしやすさ
    - GitHub連携 or GitLab連携しCircleCI用のファイうrを置く必要がある
    - 独自の構文があり、executorなどの概念がやや複雑
- ログやデバッグのしやすさ
    - ステップごとに分かれている
    - UIが見やすい
- デプロイまでの柔軟性
    - workflows(複数ジョブの制御)やcontexts(環境ごとに変数を管理)で制御可能。

## 選定
GitHub Actions
- GitHubとの統合
  - プラットフォームが同じ
    - GitHub上からPRのチェック結果が分かる
    - マージ可否の制御ができる
- 無償枠も月2000分でそれなりに豊富
- Actionsの公式、コミュニティが充実している
- Dependabot等のセキュリティ統合も可能


### トレードオフ
- OSによって分単価が異なる
  - 特にmacOSとWindowsはLinuxの10倍
- リポジトリがGitHubへの移行が難しい
- 
