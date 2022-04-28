'use strict'

/**
 * slack メッセージ送信に関するクラス
 */
class SlackMessage {

  /**
   * slack のメッセージ送信に関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {string} */
    this.webhookUrl = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL');
  }

  /**
   * slack にメッセージを送信する
   * @param {string} message - slack に投稿するメッセージ
   * @param {boolean} isChannelMention - チャンネルメンションをつけるかどうか。デフォルト引数は「false」
   */
  send(message, isChannelMention = false) {
    const options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify({
        text: isChannelMention ? '<!channel>\n' + message : message
      })
    };
    UrlFetchApp.fetch(this.webhookUrl, options);
  }

  /**
   * Webhook URL をセットする静的メソッド
   * NOTE: class properties がある場合は不要
   */
  static setWebhookUrl(webhookUrl) {
    PropertiesService.getScriptProperties().setProperty('WEBHOOK_URL', webhookUrl);
  }

}



// class SlackApi {

//   /**
//    * slack API に関するコンストラクタ
//    * @constructor
//    */
//   constructor() {
//     /** @type {string} */
//     this.token = PROPERTIES.get('USER_OAUTH_TOKEN');
//     /** @type {string} */
//     this.botToken = PROPERTIES.get('BOT_USER_OAUTH_TOKEN');
//   }

// }
