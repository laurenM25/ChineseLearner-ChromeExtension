//global scripts, NOT modern ES module libraries so import differently
import './library/pinyin4js.js';
const pinyin4js = window.pinyin4js;
import './library/segmentit.js';
const { Segment, useDefault, cnPOSTag, enPOSTag } = window;

import translate from '/Users/laurendonnelly/Downloads/code/my-projects-in-use/ChineseLearner-ChromeExtension/node_modules/translate/index.min.js';
import { allEntries, simpDict, tradDict, getEntries, getGloss, getEtymology, search } from './library/dictionary.js';

export { allEntries, simpDict, tradDict, getEntries, getGloss, search, translate, Segment, useDefault };

export function getPinyin(text) {
    return pinyin4js.convertToPinyinString(text, ' ', pinyin4js.WITH_TONE_MARK);
}