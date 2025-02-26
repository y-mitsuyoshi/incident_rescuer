# Incident Rescuer

## slackアプリの作成
https://api.slack.com/apps

参考
https://zenn.dev/yh007/articles/9ab89e24e690eb

## AWS Lambda デプロイ方法

```
serverless deploy
```

## slackアプリの作成


## ローカルでの起動方法

1. リポジトリをクローンします。
    ```sh
    git clone https://github.com/yourusername/incident_rescuer.git
    cd incident_rescuer
    ```

2. 必要な依存関係をインストールします。
    ```sh
    npm install
    ```

3. 環境変数を設定します。`.env`ファイルをプロジェクトのルートディレクトリに作成し、以下の内容を追加します。
    ```
    SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx
    SLACK_SIGNING_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```
   **注意:** `SLACK_BOT_TOKEN` と `SLACK_SIGNING_SECRET` は、Slackアプリの設定ページから取得してください。

4. アプリケーションを起動します。
    ```sh
    node app.js
    ```

5. コンソールに `⚡️ Incident Rescuer is running!` と表示されれば、アプリケーションは正常に起動しています。

**エラー: Cannot find module 'dotenv' が発生する場合**

dotenvモジュールがインストールされていない可能性があります。以下のコマンドを実行してインストールしてください。

```sh
npm install dotenv
```

インストール後、再度アプリケーションを起動してください。

6.
