
'use strict'

/**
 * 日付に関するクラス
 * 
 * method
 * 1 isWorkday
 * 2 isRestDay
 * 3 isJapaneseHoliday
 * 4 isCompanyHoliday
 * 
 */
class Day {

  /**
   * @param {Date|string|number|...number} date - Date オブジェクトでインスタンス生成可能な引数
   */
  constructor(...args) {
    this.date = new Date(...args);
  }

  /**
   * @param {Date} date = 今日の日付
   * @return {Boolean} 土日祝+指定の休日かどうかを判定　true=営業日
   * NOTE: 参考 URL https://dev.classmethod.jp/articles/202001-workday-only-gas/
   */
  isWorkday(date = this.date) {
    if (this.isRestDay(date)) return false;
    if (this.isJapaneaseHoliday(date)) return false;
    return this.isCompanyHoliday(date) === false;
  }

  /**
   * date の曜日を確認、週末は休む (true)
   * @param {Date} Date -  今日の日付
   * @return {boolean} boolean - 今日が土日なら　true　を返す
   */
  isRestDay(date = this.date) {
    return date.getDay() % 6 === 0;  // HACK: 土曜 6, 日曜 0
  }

  /**
   * date の曜日を確認、祝祭日は休む (true)
   * @param {Date} Date -  今日の日付
   * @return {boolean} boolean - 今日が祝祭日なら　true　を返す
   */
  isJapaneaseHoliday(date = this.date) {
    const calJpHolidayUrl = "ja.japanese#holiday@group.v.calendar.google.com";
    const calJpHoliday = CalendarApp.getCalendarById(calJpHolidayUrl);
    return calJpHoliday.getEventsForDay(date).length !== 0;
  }

  /**
   * date の曜日を確認、会社の指定休日は休む (true)
   * @param {date} Date -  今日の日付
   * @return {boolean} boolean - 今日が会社の指定休日なら　true　を返す
   */
  isCompanyHoliday(date = this.date) {
    const sheet = new Sheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_INFO.DATEMASTER.NAME));
    const results = sheet.getResultsByDicts(SHEET_INFO.DATEMASTER.COLUMN_NAME.TYPE.VALUE.WINTER_HOLIDAY);
    const winterHolidayTimes = results.map(date => date.getTime());
    return winterHolidayTimes.includes(date.getTime()) === true;
  }

  /**
   * 指定のフォーマットで日時を文字列化する静的メソッド
   * @param {Date} d - Date オブジェクト 文字列型も可
   * @param {string} format - フォーマットする形式
   * @param {boolean} hasJDay - 日本語表記の曜日を追加するかどうか
   * @return {string} フォーマットされた文字列型の日時
   */
  static format(d = new Date(), format = 'yyyy/MM/dd', hasJDay = true) {
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format) + (hasJDay ? '(' + '日月火水木金土日'[date.getDay()] + ')' : '');
    return strDate;
  }

}