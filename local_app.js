const { App } = require('@slack/bolt');
const { handleMessage } = require('./src/app_functions');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(async ({ event, say }) => {
  if (event.thread_ts) {
    return;
  }

  
  await handleMessage(event, say);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Incident Rescuer is running!');
})();
