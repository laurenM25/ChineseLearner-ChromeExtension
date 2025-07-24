// listen for text selection events
// grab and send selected chinese to tooltip renderer
// look up definitions

import { getGloss, search, translate, getPinyin, Segment, useDefault } from './utils.js';
console.log("content.js is running");
//listen

document.addEventListener("mouseup", async () => {
    const selection = window.getSelection().toString().trim();
    if (!selection) return;

    // Only act on Chinese characters
    const isChinese = /[\u4e00-\u9fff]/.test(selection);
    if (!isChinese) return;

    //now, we know there is a chinese selection
    //create tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "chinese-tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.zIndex = 9999;
    tooltip.style.background = "#fff";
    tooltip.style.border = "1px solid #ccc";
    tooltip.style.padding = "8px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    tooltip.style.fontSize = "14px";

    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    tooltip.style.top = `${window.scrollY + rect.top - 40}px`;
    tooltip.style.left = `${window.scrollX + rect.left}px`;

    const pinyin = getPinyin(selection);
    try {
        const gloss = await getGloss(selection);
        if (selection == gloss) {
            console.log(`gloss (${gloss}) is same as selection(${selection}), giving longtrans`)
            const longTrans = await translate(selection, { from: 'zh', to: 'en' });
            if (longTrans.trim().split(" ").length < 6) {
                console.log("longTrans is less than 6 words");
                tooltip.innerText = `translation: ${longTrans}\n${pinyin}`;
            } else {
                console.log("longTrans is more than or equal to 6 words");
                tooltip.innerText = `translation: ${longTrans}`;
            }
        } else {
            tooltip.innerText = `${selection}: ${gloss}\n${pinyin}`;
        }
    } catch (err) {
        tooltip.innerText = `Error: ${err.message}`;
    }

    document.body.appendChild(tooltip);

    setTimeout(() => tooltip.remove(), 5000);
});
