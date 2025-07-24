(async () => {
    //check translate package
    require('dotenv').config();

    const { default: translate } = await import('translate'); //we just want function not entire module
    translate.engine = "deepl";
    translate.key = process.env.DEEPL_KEY;
    //const text = await translate("Hello world", "zh");
    //console.log(text);

    // now check pinyin (using pinyin4js instead) package
    const pinyin = (await import('pinyin4js')).default;
    console.log(pinyin.convertToPinyinString('厦门你好大厦厦门', ' ', pinyin.WITH_TONE_MARK));

    //check segmentit package
    const { Segment, useDefault, cnPOSTag, enPOSTag } = require('segmentit');
    const segmentit = useDefault(new Segment());

    console.log(segmentit.doSegment('一人得道，鸡犬升天').map(i => `${i.w} <${cnPOSTag(i.p)}> <${enPOSTag(i.p)}>`));
    // ↑ ["一人得道 <习语,数词 数语素> <l,m>", "， <标点符号> <w>", "鸡犬升天 <成语> <i>"]

    const result = segmentit.doSegment('工信处女干事每月经过下属科室都要亲口交代24口交换机等技术性器件的安装工作。');
    const words = result.map(item => item.w); // gets all the values matching the key "w" from list of dictionaries
    console.log(words);

    //DICTIONARY API
    const { entries, simpDict, tradDict, getEntries, getGloss, getEtymology, search } = require("chinese-lexicon");
    console.log(getEntries("工作"));
    console.log("hey, can we get a gloss?")
    console.log(getGloss("工作"));
    console.log("any gloss?");
    //console.log(search("工作")); returns many results, can add parameter to limit number of results

    //lets combine our usage of packages
    //remember, gogole translate isn't good at doing small translations, so use dictionary for smaller phrases
    const pinyinWords = words.map(word => pinyin.convertToPinyinString(word, ' ', pinyin.WITH_TONE_MARK));
    console.log(pinyinWords);
    const translatedWords = await Promise.all(
        words.map(async (word) => {
            try {
                let text = getGloss(word);
                if (text == word) {
                    text = search(word);
                    if (Array.isArray(text) && text.length === 0) {
                        if (Array.isArray(word)) {
                            text = await Promise.all(word.map(async (term) => {
                                return await getGloss(term);
                            }))
                        }
                        else {
                            // Split string into characters or logic to get sub-terms
                            const terms = Array.from(word);
                            text = await Promise.all(terms.map(async (term) => {
                                const gloss = await getGloss(term);
                                return { term, gloss };
                            }));
                        }
                    }
                }

                console.log(`Translated "${word}":`, text);
                return text;
            } catch (error) {
                console.error(`Failed to translate "${word}":`, error);
                return undefined;
            }
        })
    );
    console.log(translatedWords);

})();