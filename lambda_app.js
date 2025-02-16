const { App, AwsLambdaReceiver } = require('@slack/bolt');

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

module.exports.handler = async (event, context, callback) => {
  callback(null, {statusCode: 200, body: JSON.stringify({ok: 'ok'})});
  if (event.headers['X-Slack-Retry-Num']){
    console.log('リトライのため終了');
    console.log(event);
    return;
  }

  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
}

app.message(async ({ event, say }) => {
    try {
      // メッセージの情報を取得
      const channelId = event.channel;
      const messageText = event.text;
      const userId = event.user;
  
      // 取得したメッセージ情報をコンソールに出力
      console.log(`チャンネル: ${channelId}, メッセージ: ${messageText}, ユーザー: ${userId}`);
  
      await say(`test`);
    } catch (error) {
      console.error(error);
    }
  });
