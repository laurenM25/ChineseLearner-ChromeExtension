# Chinese Learner Chrome Extension (in development)
This project is a chrome extension aid for translation and pinyin of Chinese text as the user highlights text while browsing. Project began on July 23, 2025.

## Packages used
- [pinyin4js]("https://github.com/Kaifuny/pinyin4js) gives pinyin for chinese characters
- [segmentit]("https://github.com/linonetwo/segmentit) breaks up sentences (chinese word segmentation)
- [translate]("https://github.com/franciscop/translate/blob/master/README.md) translator (for longer phrases/sentences)
- [chinese-lexicon](https://www.npmjs.com/package/chinese-lexicon?activeTab=readme) chinese-english dictionary

## Basic function
When you highlight a portion of text on a webpage, a pop-up will appear if the text is written in mandarin chinese. The pop-up will either show a quick dictionary translation of the word or a phrase/sentence-long translation along with pinyin for any words or phrases equivalent to 5 english words or less.

## Loading extension manually
- Download repo.
- Access chrome://extensions via a chrome browser.
- With Developer Mode on, add code to the extension directory via "Load unpacked."
- Open any webpage to test the extension. Refresh the extension to ensure any changes to the code are reflected. This extension will not work on certain protected websites, and dark mode may cause an inverted color appearance that makes it hard to read pop-ups.

## Planned developments
- Detailed dictionary views of vocabulary
- Enhanced visual design
- Tracking frequently visited words to be accessed later as a study material 
- Image processing translation (potentially)