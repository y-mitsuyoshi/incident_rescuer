# Incident Rescuer

## 障害対応情報の追加方法

Incident Rescuerは、`src/error_responses.yaml`ファイルに障害内容と対応を記述することで、Slackに適切な対応を自動で返信する機能を提供します。

### `error_responses.yaml` へのデータ追加

1.  `src/error_responses.yaml` ファイルを開きます。
2.  `error_responses` の下に、障害内容（キー）と対応（値）をYAML形式で追加します。

    ```yaml
    error_responses:
      "Disk full": |
        ディスク容量が不足しています。
        不要なファイルを削除するか、ディスク容量を拡張してください。
        詳細な手順は、管理者にお問い合わせください。

        以下のコマンドでディスク使用状況を確認できます。
        ```
        df -h
        ```
      "Connection timeout": |
        ネットワーク接続がタイムアウトしました。
        ネットワーク環境を確認し、再度お試しください。
        問題が解決しない場合は、ネットワーク管理者にご連絡ください。

        以下のコマンドでネットワーク接続を確認できます。
        ```
        ping google.com
        ```
    ```

    *   キー: Slackに投稿されるエラーメッセージと完全に一致する文字列を指定します。
    *   値: Slackに返信するメッセージを指定します。複数行にわたるメッセージや、コードブロックを含めることも可能です。

## Slackアプリの作成

### 1. Slackアプリの管理ページにアクセスします。

[Slackアプリの管理ページ](https://api.slack.com/apps)

### 2. 「Create New App」をクリックします。

![Create New App](https://github.com/user-attachments/assets/f8eeaaa8-18f4-4496-bba9-b9c9b9f35627)


### 3. アプリの作成方法を選択します。

「From scratch」を選択します。

![Create an app](https://github.com/user-attachments/assets/9515e2b3-8cc9-43f6-84b9-703bf5198cd3)


### 4. アプリ名とワークスペースを入力し、「Create App」をクリックします。

アプリ名 (例: Incident Rescuer) と、アプリをインストールするワークスペースを選択して、「Create App」をクリックします。

![Nama App](https://github.com/user-attachments/assets/d3848ee1-cae4-4dc0-a9ee-1ab413600e59)


### 5. Signing Secretを設定します。

*   「Basic Information」ページに移動します。
*   「Signing Secret」セクションまでスクロールし、表示されている値をコピーします。
*   コピーした値を、`.env`ファイルの`SLACK_SIGNING_SECRET`に設定します。

![SLACK_SIGNING_SECRET](https://github.com/user-attachments/assets/098a7fd2-e9e1-4295-81a3-ea287ca82b22)


### 6. OAuth & Permissionsを設定します。

*   左側のサイドバーから「OAuth & Permissions」を選択します。
*   「Bot Token Scopes」セクションで、必要なスコープを追加します。
    *   今回は、`chat:write`を追加してください。これにより、アプリがメッセージを送信できるようになります。
    *   必要に応じて、他のスコープも追加できます (例: `channels:read`)。

![Scopes](https://github.com/user-attachments/assets/bcf81cb3-d074-4d52-a757-9b53891c317d)


### 7. アプリをワークスペースにインストールします。

*   ページ上部の「Install to Workspace」ボタンをクリックします。
*   表示される指示に従ってアプリをインストールします。
*   インストール後、「Bot User OAuth Token」が表示されるので、コピーして`.env`ファイルの`SLACK_BOT_TOKEN`に設定します。

![OAuth   Permissions](https://github.com/user-attachments/assets/87476309-fd4f-4eec-8579-9c8a08b90f85)



## ローカルでの起動方法

### 1. リポジトリをクローンします。
    ```sh
    git clone https://github.com/yourusername/incident_rescuer.git
    cd incident_rescuer
    ```

### 2. 必要な依存関係をインストールします。
    ```sh
    npm install
    ```

### 3. 環境変数を設定します。`.env`ファイルをプロジェクトのルートディレクトリに作成し、以下の内容を追加します。
    ```
    SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx
    SLACK_SIGNING_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```
   **注意:** `SLACK_BOT_TOKEN` と `SLACK_SIGNING_SECRET` は、Slackアプリの設定ページから取得してください。

### 4. アプリケーションを起動します。
    ```sh
    node local_app.js
    ```

### 5. コンソールに `⚡️ Incident Rescuer is running!` と表示されれば、アプリケーションは正常に起動しています。

**注意:** このアプリケーションはNode.js v22.14で検証されています。

### 6. ngrokをインストールする

ngrokを使用すると、ローカルで実行しているサーバーを外部に公開できます。

#### Windows

1.  [ngrokのダウンロードページ](https://ngrok.com/download)からWindows版をダウンロードします。
2.  ダウンロードしたzipファイルを展開します。
3.  展開したngrok.exeを実行します。

#### Linux

1.  [ngrokのダウンロードページ](https://ngrok.com/download)からLinux版をダウンロードします。
2.  ダウンロードしたファイルを展開します。

    ```sh
    unzip ngrok-stable-linux-amd64.zip
    ```
3.  ngrokを実行可能にします。

    ```sh
    chmod +x ngrok
    ```

#### Mac

Homebrewを使用してngrokをインストールします。

1.  Homebrewがインストールされていることを確認してください。インストールされていない場合は、[Homebrewの公式サイト](https://brew.sh/)の手順に従ってインストールしてください。
2.  ターミナルで以下のコマンドを実行してngrokをインストールします。

    ```sh
    brew install ngrok
    ```

**ngrokの実行**

ターミナルでngrokを実行し、SlackアプリのイベントURLを公開します。

```sh
ngrok http 3000
```

上記のコマンドは、ローカルの3000番ポートで実行されているサーバーをngrokで公開します。ngrokが発行するURLをSlackアプリのイベントURLに設定してください。

### 7. Event Subscriptionsを有効にする

SlackアプリのEvent Subscriptionsを有効にするには、以下の手順に従ってください。

1.  Slack APIのウェブサイトにアクセスし、アプリを選択します。
2.  左側のサイドバーにある「Event Subscriptions」をクリックします。
3.  「Enable Events」をオンにします。
4.  「Request URL」に、ngrokで公開したURLと`/slack/events`を組み合わせたURLを入力します（例: `https://your-ngrok-url.ngrok-free.app/slack/events`）。
5.  「Subscribe to bot events」セクションで、アプリが必要とするイベントを選択します（例: `message.channels`）。
6.  変更を保存します。

![Event Subscriptions](https://github.com/user-attachments/assets/ede90f4d-d16f-4cc5-a5a5-e6bcba0b4e67)

### 8. Slackにアプリを追加する

1. アプリを追加したいチャンネルに移動する
2. インテグレーションのタブを開く

   ![インテグレーション](https://github.com/user-attachments/assets/14fc2c3b-c055-46ca-a1bc-304155e36ba0)

3. アプリを追加するを押下する
4. 対象のアプリを追加する

## AWS Lambda デプロイ方法

```
serverless deploy
```
