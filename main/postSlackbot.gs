/**
 * 参考
 * https://auto-worker.com/blog/?p=2904#
 * 
 * 参考　プロパティストア
 * https://tonari-it.com/gas-property-store/
 * 
 * 参考　GASでSlackAPIが使えるライブラリ
 * https://blog.guchimina.com/?p=370
 * https://github.com/soundTricker/SlackApp
 * 
 * スプレッドシートで計算した残営業日を取得してslackで通知する。
 */
'use strict'
function postSlackbot() {

  const sheet = new Sheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_INFO.DATEMASTER.NAME));
  const businessDaysRemainingThisMonth = sheet.getResultsByDicts(SHEET_INFO.DATEMASTER.COLUMN_NAME.TYPE.VALUE.BUSINESSDAYS_REMAINING_THIS_MONTH)[0];
  const businessDaysRemainingInThisYear = sheet.getResultsByDicts(SHEET_INFO.DATEMASTER.COLUMN_NAME.TYPE.VALUE.BUSINESSDAYS_REMAINING_THIS_YEAR)[0];
  const businessDaysRemainingInThisFiscalYear = sheet.getResultsByDicts(SHEET_INFO.DATEMASTER.COLUMN_NAME.TYPE.VALUE.BUSINESSDAYS_REMAINING_THIS_FISCAL_YEAR)[0];
  const strDate = Day.format();
  const replacementLists = [
    [/stringifiedToday/g, strDate],
    [/businessDaysRemainingThisMonth/g, businessDaysRemainingThisMonth],
    [/businessDaysRemainingInThisYear/g, businessDaysRemainingInThisYear],
    [/businessDaysRemainingInThisFiscalYear/g, businessDaysRemainingInThisFiscalYear],
  ];
  const message = StringEx.replaceWithLists(MESSAGE.WORKDAY, replacementLists);
  const sm = new SlackMessage();
  sm.send(message);
}


  // //Slackボットがメッセージを投稿するチャンネルを定義する
  // const channelId = "#general";

  // //Slackボット　表示名 Appの設定とは別の名前を指定できる
  // const slackBotNameInTheChannel = "営業日カウントダウンbotさん";

  // //Slackボット　アイコン画像 Appの設定とは別の画像を指定できる
  // const slackBotIconAsImageURL = "http://flat-icon-design.com/f/f_business_23/s256_f_business_23_0bg.png";

  // //Slackボット　アイコン　絵文字
  // //絵文字コード　https://www.webfx.com/tools/emoji-cheat-sheet/
  // const slackBotIconAsEmoji = ":calendar:"

  // //SlackAppオブジェクトのpostMessageメソッドでボット投稿を行う
  // slackApp.chatPostMessage(channelId, message, {
  //   username: slackBotNameInTheChannel, //投稿するbotの名前
  //   icon_emoji: slackBotIconAsEmoji, //投稿するbotの画像　icon_url　よりも優先される。
  //   icon_url: slackBotIconAsImageURL//投稿時に表示されるアイコン画像URLの指定
  // });