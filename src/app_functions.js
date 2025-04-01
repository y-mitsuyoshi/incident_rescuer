const yaml = require('js-yaml');
const fs = require('fs');

// YAMLファイルからエラー対応情報を読み込む
const errorResponses = yaml.load(fs.readFileSync('./src/error_responses.yaml', 'utf8')).error_responses;

/**
 * メッセージに一致するエラー対応を検索する
 * @param {string} message - チェック対象のメッセージ
 * @return {string|null} - 見つかった対応策、なければnull
 */
function findErrorResponse(message) {
  for (const errorKey in errorResponses) {
    if (message.includes(errorKey)) {
      return errorResponses[errorKey];
    }
  }
  return null;
}

/**
 * 受信したメッセージを処理する
 */
async function handleMessage(event, say) {
  try {
    const messageText = event.text;
    const thread_ts = event.ts;

    // エラーメッセージに対応するレスポンスを検索
    const response = findErrorResponse(messageText);
    
    // 対応するレスポンスがない場合は何もしない
    if (!response) return;

    // レスポンスを送信
    await say({
      text: response,
      thread_ts: thread_ts
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleMessage };
