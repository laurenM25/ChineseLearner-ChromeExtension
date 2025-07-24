'use strict';

// Import submodules
var PinyinHelper = require('../node_modules/pinyin4js/lib/PinyinHelper');
var ChineseHelper = require('../node_modules/pinyin4js/lib/ChineseHelper');
var PinyinFormat = require('../node_modules/pinyin4js/lib/PinyinHelper'); // Assuming this is intentional

// Create the global object
var pinyin4js = {
    WITH_TONE_MARK: "WITH_TONE_MARK",   //带声调
    WITHOUT_TONE: "WITHOUT_TONE",     //不带声调
    WITH_TONE_NUMBER: "WITH_TONE_NUMBER", //数字代表声调
    FIRST_LETTER: "FIRST_LETTER",     //首字母风格

    convertToPinyinString: function (str, separator, format) {
        return PinyinHelper.PinyinHelper.convertToPinyinString(str, separator, format);
    },

    convertToSimplifiedChinese: function (str) {
        return ChineseHelper.ChineseHelper.convertToSimplifiedChinese(str);
    },

    convertToTraditionalChinese: function (str) {
        return ChineseHelper.ChineseHelper.convertToTraditionalChinese(str);
    },

    getShortPinyin: function (str) {
        return PinyinHelper.PinyinHelper.getShortPinyin(str);
    }
};

// Attach to global scope for browsers
if (typeof window !== 'undefined') {
    window.pinyin4js = pinyin4js;
}
