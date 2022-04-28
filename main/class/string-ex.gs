'use strict'

class StringEx {

  /**
   * 置換リストにしたがって置換する静的メソッド
   * @param {string} string - 置換対象の文字列
   * @param {Array.<Array.<RegExp|string>>} replacementLists - 置換リスト
   * @return {string} 置換後の文字列
   * NOTE: replacementLists は [[/hoge/g, 'HOGE']] のようなもの
   */
  static replaceWithLists(string, replacementLists) {
    const replaced = replacementLists.reduce((pre, list) => pre.replace(...list), string);
    return replaced;
  }

}