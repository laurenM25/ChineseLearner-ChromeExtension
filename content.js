// listen for text selection events
// grab and send selected chinese to tooltip renderer
// look up definitions

import { getGloss, search } from './utils.js'; //translate, pinyin4js, Segment, useDefault are other ones
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

    try {
        const gloss = await getGloss(selection);
        tooltip.innerText = `${selection}: ${gloss}`;
    } catch (err) {
        tooltip.innerText = `Error: ${err.message}`;
    }

    document.body.appendChild(tooltip);

    setTimeout(() => tooltip.remove(), 5000);
});
