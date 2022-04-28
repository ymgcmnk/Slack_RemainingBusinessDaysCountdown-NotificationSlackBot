/**
 * 参考
 * https://github.com/etau/gas-classes/blob/main/global.gs
 */

'use strict'

/**
 * グローバル定数宣言
 */
/** @type {SpreadsheetApp.Spreadsheet} */
const SS = SpreadsheetApp.getActiveSpreadsheet();

/** @enum {number|string}  */
const SHEET_INFO = {
  HOLIDAY: {
    NAME: '祝日リスト',
  },
  DATEMASTER: {
    NAME: '日付マスタ',
    COLUMN_NAME: {
      TYPE: {
        NAME: '種別',
        VALUE: {
          WINTER_HOLIDAY: '今年の冬期休暇',
          BUSINESSDAYS_REMAINING_THIS_MONTH: '今月の残り営業日数',
          BUSINESSDAYS_REMAINING_THIS_YEAR: '年内の残り営業日数',
          BUSINESSDAYS_REMAINING_THIS_FISCAL_YEAR: '今年度の残り営業日数',
        },
      },
      RESULT: {
        NAME: '計算結果',
      },
    },
  },
};
const MESSAGE = {
  WORKDAY: '今日は stringifiedToday です。\n' +
    '今日を含めて、\n' +
    '今月の残り営業日数は、あと businessDaysRemainingThisMonth 日です。\n' +
    '今年の残り営業日数は、あと businessDaysRemainingInThisYear 日です。\n' +
    '今年度の残り営業日数は、あと businessDaysRemainingInThisFiscalYear 日です。',
};