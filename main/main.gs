/**
 * トリガーアカウント： xxxx@gmail.com
 * 実行スクリプト：main
 * トリガーイベント：例: 時間主導型 / 日付ベースのタイマー / 1日 / 午前 7 時～8 時 
 * 
 * @param {Date} Date -  今日の日付（globalから）
 */
'use strict'
function main() {
  const newDay = new Day();
  if (newDay.isWorkday() === false) return console.log(`今日は　営業日じゃないのでSlackには投稿しませんでした。`);

  postSlackbot();
  console.log(`今日は　営業日なのでSlackに投稿しました。`);
}
