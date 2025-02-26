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
    node app.js
    ```

### 5. コンソールに `⚡️ Incident Rescuer is running!` と表示されれば、アプリケーションは正常に起動しています。

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
3. アプリを追加するを押下する
4. 対象のアプリを追加する
