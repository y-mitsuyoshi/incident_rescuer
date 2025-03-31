const { App, AwsLambdaReceiver } = require('@slack/bolt');
const { handleMessage } = require('./src/app_functions');
require('dotenv').config();

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.message(async ({ event, say }) => {
  if (event.thread_ts) {
    return;
  }

  await handleMessage(event, say);
});

module.exports.handler = async (event, context) => {
  // SlackのChallengeリクエストに対応
  if (event.body) {
    const body = JSON.parse(event.body);
    if (body.challenge) {
      console.log("Challenge received");
      return { statusCode: 200, body: body.challenge };
    }
  }

  if (event.headers['X-Slack-Retry-Num']){
    console.log('リトライのため終了');
    console.log(event);
    return { statusCode: 200, body: 'OK' };
  }

  try {
    const handler = await awsLambdaReceiver.start();
    await handler(event, context);
    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Error processing Slack event:', error);
    return { statusCode: 500, body: 'Error' };
  }
}