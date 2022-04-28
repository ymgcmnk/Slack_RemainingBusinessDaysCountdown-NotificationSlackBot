// https://github.com/etau/gas-classes/blob/main/class_sheet.gs

'use strict'

class Sheet {

  /**
   * シートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.sheet} sheet - 対象となるシート
   * @param {number} headerRows - ヘッダーの行数
   * @param {number} headerIndex - ヘッダー行のインデックス (ユニークなカラム)
   */
  constructor(sheet = SpreadsheetApp.getActiveSheet(), headerRows = 1, headerIndex = headerRows - 1) {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
    /** @type {number} */
    this.headerRows = headerRows;
    /** @type {number} */
    this.headerIndex = headerIndex;
  }

  /**
   * Class Sheet から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/spreadsheet/sheet
   */
  getDataRange() { return this.sheet.getDataRange(); }
  getRange(...args) { return this.sheet.getRange(...args); }

  /**
   * シートの値すべて取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} シートの値
   */
  getDataRangeValues() {
    if (this.dataRangeValues_ !== undefined) return this.dataRangeValues_;
    const dataRangeValues = this.getDataRange().getValues();
    this.dataRangeValues_ = dataRangeValues;
    return dataRangeValues;
  }

  /**
   * ヘッダー一覧を取得するメソッド
   * @return {Array.<string>} ヘッダー一覧
   */
  getHeaders() {
    if (this.headers_ !== undefined) return this.headers_;
    const headerValues = this.getHeaderValues();
    const headers = headerValues[this.headerIndex];
    this.headers_ = headers;
    return headers;
  }

  /**
   * ヘッダー部分を取得するメソッド
   * @return {Array.<Array.<string>>} ヘッダー部分
   */
  getHeaderValues() {
    if (this.headerValues_ !== undefined) return this.headerValues_;
    const values = this.getDataRangeValues();
    const headerValues = values.filter((_, i) => i < this.headerRows);
    this.headerValues_ = headerValues;
    return headerValues;
  }

  /**
   * ヘッダー行を除いたレコード部分を取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} レコード
   */
  getDataValues() {
    if (this.dataValues_ !== undefined) return this.dataValues_;
    const values = this.getDataRangeValues();
    const dataValues = values.filter((_, i) => i >= this.headerRows);
    this.dataValues_ = dataValues;
    return dataValues;
  }

  // /**
  //  * ヘッダー情報から列番号を返すメソッド
  //  * @param {string} headerName - ヘッダー名
  //  * @return {number} 列番号
  //  */
  // getColumnByHeaderName(headerName) {
  //   const columnIndex = this.getColumnIndexByHeaderName(headerName, this.headerIndex);
  //   const column = columnIndex + 1;
  //   return column;
  // }

  // /**
  //  * ヘッダー情報から列インデックスを返すメソッド
  //  * @param {string} headerName - ヘッダー名
  //  * @return {number} 列インデックス
  //  */
  // getColumnIndexByHeaderName(headerName) {
  //   const headers = this.getHeaders(this.headerIndex);
  //   const columnIndex = headers.indexOf(headerName);
  //   if (columnIndex === -1) throw new Error('The value "' + headerName + '" does not exist in the header row of sheet' + this.getName() + '.');
  //   return columnIndex;
  // }


  /**
   * A 列「種別」に対してフィルタされたレコードの D 列「計算結果」を取得するメソッド
   * @param {string} type - A 列に表記されている種別内容
   * @return {Array.<number|Date>} D 列の値
   */
  getResultsByDicts(type) {
    const filteredDicts = this.filterDictsByType(type);
    const results = filteredDicts.map(dict => dict.get(SHEET_INFO.DATEMASTER.COLUMN_NAME.RESULT.NAME));
    return results;
  }

  /**
   * A 列「種別」に対してフィルタされた dicts を取得するメソッド
   * @param {string} type - A 列に表記されている種別内容
   * @return {Array.<Map>} 種別内容でフィルタされた dicts
   */
  filterDictsByType(type) {
    const filteredDicts = this.filterDicts(SHEET_INFO.DATEMASTER.COLUMN_NAME.TYPE.NAME, type);
    return filteredDicts;
  }

  /**
   * フィルター対象の列に合致した dicts を取得するメソッド
   * @param {string} headerName - フィルター対象の列のヘッダー名
   * @param {string|number|boolean|Date} value - フィルター対象の値
   * @return {Array.<Map>} フィルターされた dicts
   */
  filterDicts(headerName, value) {
    const dicts = this.getAsDicts();
    const filteredDicts = dicts.filter(dict => dict.get(headerName) === value);
    return filteredDicts;
  }

  /**
   * シートの値から、ヘッダー情報をプロパティとして持つ Map 型を生成するメソッド
   * @return {Array.<Map>} ヘッダー情報を key, 値を value として持つ Map
   */
  getAsDicts() {
    if (this.dicts_ !== undefined) return this.dicts_;
    const headers = this.getHeaders(this.headerIndex);
    const values = this.getDataValues();
    const dicts = values.map((record, i) => record.
      reduce((acc, cur, j) => acc.set(headers[j], cur), new Map([
        // ['row', i + this.headerRows + 1],
        // ['record', record]
      ]))
    );
    this.dicts_ = dicts;
    return dicts;
  }

}