const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate = (obj) => {
        var sentence = obj.text;
        if (obj.locale === "american-to-british") {
            for (const [ame, bre] of Object.entries(americanOnly)) {
                const regex = new RegExp(`\\b${ame}\\b`, "ig");
                const matches = sentence.match(regex)
                if (matches) {
                    for (const match of sentence.match(regex)) {
                        if (obj.text.includes(match)) {
                            sentence = sentence.replace(match, `<span class="highlight">${bre}</span>`);
                        }
                    }
                }
            }
            
            for (const [ame, bre] of Object.entries(americanToBritishSpelling)) {
                const regex = new RegExp(`\\b${ame}\\b`, "ig");
                const matches = sentence.match(regex)
                if (matches) {
                    for (const match of sentence.match(regex)) {
                        if (obj.text.includes(match)) {
                            sentence = sentence.replace(match, `<span class="highlight">${bre}</span>`);
                        }
                    }
                }
            }

            for (const [ame, bre] of Object.entries(americanToBritishTitles)) {
                const regex = new RegExp(`\\b${ame}`, "ig");
                const matches = sentence.match(regex)
                if (matches) {
                    for (const match of sentence.match(regex)) {
                        if (obj.text.includes(match)) {
                            sentence = sentence.replace(match, `<span class="highlight">${bre.slice(0, 1).toUpperCase() + bre.slice(1)}</span>`);
                        }
                    }
                }
            }

            const ameTimeRegex = /\d+:\d+/g;
            const matches = sentence.match(ameTimeRegex);
            if (matches) {
                for (const match of sentence.match(ameTimeRegex)) {
                    if (obj.text.includes(match)) {
                        sentence = sentence.replace(match, `<span class="highlight">${match.replace(":", ".")}</span>`);
                    }
                }
            }
        } else {
            for (const [bre, ame] of Object.entries(britishOnly)) {
                const regex = new RegExp(`\\b${bre}\\b`, "ig");
                const matches = sentence.match(regex)
                if (matches) {
                    for (const match of sentence.match(regex)) {
                        if (obj.text.includes(match)) {
                            sentence = sentence.replace(match, `<span class="highlight">${ame}</span>`);
                        }
                    }
                }
            }
            
            for (const [ame, bre] of Object.entries(americanToBritishSpelling)) {
                const regex = new RegExp(`\\b${bre}\\b`, "ig");
                const matches = sentence.match(regex)
                if (matches) {
                    for (const match of sentence.match(regex)) {
                        if (obj.text.includes(match)) {
                            sentence = sentence.replace(match, `<span class="highlight">${ame}</span>`);
                        }
                    }
                }
            }

            for (const [ame, bre] of Object.entries(americanToBritishTitles)) {
                const regex = new RegExp(`\\b${bre}\\b`, "ig");
                const matches = sentence.match(regex)
                if (matches) {
                    for (const match of sentence.match(regex)) {
                        if (obj.text.includes(match)) {
                            sentence = sentence.replace(match, `<span class="highlight">${ame.slice(0, 1).toUpperCase() + ame.slice(1)}</span>`);
                        }
                    }
                }
            }

            const breTimeRegex = /\d+\.\d+/;
            const matches = sentence.match(breTimeRegex);
            if (matches) {
                for (const match of sentence.match(breTimeRegex)) {
                    if (obj.text.includes(match)) {
                        sentence = sentence.replace(match, `<span class="highlight">${match.replace(".", ":")}</span>`);
                    }
                }
            }
        }
        return sentence;
    }
}

module.exports = Translator;