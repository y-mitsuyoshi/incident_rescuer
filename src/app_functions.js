const yaml = require('js-yaml');
const fs = require('fs');

// YAMLファイルからエラー対応情報を読み込む
const errorResponses = yaml.load(fs.readFileSync('./src/error_responses.yaml', 'utf8')).error_responses;

async function handleMessage(event, say) {
  try {
    const messageText = event.text;
    const thread_ts = event.ts;

    // エラーメッセージに基づいて適切な対応を取得
    let response = errorResponses[messageText] || "不明なエラーです。ログを確認してください。";

    await say({
      text: response,
      thread_ts: thread_ts
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleMessage };
