const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(async ({ event, say }) => {
  try {
    // メッセージの情報を取得
    const channelId = event.channel;
    const messageText = event.text;
    const userId = event.user;

    // 取得したメッセージ情報をコンソールに出力
    console.log(`チャンネル: ${channelId}, メッセージ: ${messageText}, ユーザー: ${userId}`);

    await say(`レビューお願いたします。 first: <@${firstReviewer}>, second: <@${secondReviewer}>!`);
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Incident Rescuer is running!');
})();
