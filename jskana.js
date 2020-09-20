

const HIRAGANA_CHARCODE_START = 0x3040;
const HIRAGANA_CHARCODE_END = 0x309f;
const HIRAGANA_CHARCODE_FUNCTIONAL = [
    0x3043, 0x3045, 0x3047, 0x3049, 0x3063, 0x3083, 0x3085, 0x3087, 0x308e, 0x3095, 0x3096, 0x309d, 0x309e,
];

const KATAKANA_CHARCODE_START = 0x30a0;
const KATAKANA_CHARCODE_END = 0x30ff;
const KATAKANA_CHARCODE_FUNCTIONAL = [
    0x30a1, 0x30a3, 0x30a5, 0x30a7, 0x30a9, 0x30ab, 0x30c3, 0x30e3, 0x30e5, 0x30e7, 0x30ee, 0x30f5, 0x30f6,
    0x30fc, 0x30fd, 0x30fe,
];

const KANA_FUNCTIONAL_CHARCODES = [
    HIRAGANA_CHARCODE_FUNCTIONAL,
    KATAKANA_CHARCODE_FUNCTIONAL,
];

const KANJI_CHARCODE_START = 0x4e00;
const KANJI_CHARCODE_END = 0x9faf;

const PUNCTUATION_CHARCODE_START = 0x3000;
const PUNCTUATION_CHARCODE_END = 0x303f;

const ROMAJI_CHARCODE_RANGES = [
    [0x41, 0x5a], // A-Z
    [0x61, 0x7a], // a-z
    [0xff21, 0xff3a], // Full width roman A-Z
    [0xff41, 0xff5a], // Full width roman a-z
];

const WHITESPACE_CHARCODES = [0x09, 0x0a, 0x0d, 0x20];

const HIRAGANA = 0;
const KATAKANA = 1;
const KANJI = 2;
const PUNCTUATION = 3;
const ROMAJI = 4;

const _WRITINGSYSTEM_START = [
    HIRAGANA_CHARCODE_START,
    KATAKANA_CHARCODE_START,
    KANJI_CHARCODE_START,
    PUNCTUATION_CHARCODE_START,
];

const _WRITINGSYSTEM_END = [
    HIRAGANA_CHARCODE_END,
    KATAKANA_CHARCODE_END,
    KANJI_CHARCODE_END,
    PUNCTUATION_CHARCODE_END,
];

function _isCharFunctional(str) {
    const charCode = str.charCodeAt(0);

    for(let i = 0; i < KANA_FUNCTIONAL_CHARCODES.length; i++) {
        const system = KANA_FUNCTIONAL_CHARCODES[i];

        if(system.includes(charCode)) {
            return true;
        }
    }

    return false;
}

function _isCharWhitespace(str) {
    const charCode = str.charCodeAt(0);

    return WHITESPACE_CHARCODES.includes(charCode);
}

function _isCharRomaji(str, include_punctuation) {
    for(let i = 0; i < ROMAJI_CHARCODE_RANGES.length; i++) {
        const range = ROMAJI_CHARCODE_RANGES[i];

        const charCode = str.charCodeAt(0);
        const rangeStart = range[0];
        const rangeEnd = range[1];
        const isOfSystem = (charCode >= rangeStart && charCode <= rangeEnd) || _isCharWhitespace(str);

        if(isOfSystem || (isPunctuation(str) && include_punctuation)) {
            return true;
        }
    }


    return false;
}

function isStringOfSystem(str, system, include_punctuation) {
    if(system === ROMAJI) {
        return isRomaji(str, include_punctuation);
    } else {
        return [...str].every((char) => {
            const charCode = char.charCodeAt(0);
            const isOfSystem = (charCode >= _WRITINGSYSTEM_START[system] && charCode <= _WRITINGSYSTEM_END[system]) || _isCharWhitespace(char);

            if(include_punctuation) {
                return isOfSystem || isPunctuation(char);
            } else {
                return isOfSystem;
            }
        });
    }
}

function splitKanaString(str) {
    let chars = [];

    let current = '';

    [...str].forEach((char) => {
        if(current.length > 0 && !_isCharFunctional(char)) {
            chars.push(current);
            current = '';
        }

        current += char;
    });

    if(current.length > 0) {
        chars.push(current);
    }

    return chars;
}

function isHiragana(str, include_punctuation=true) { return isStringOfSystem(str, HIRAGANA, include_punctuation); }
function isKatakana(str, include_punctuation=true) { return isStringOfSystem(str, KATAKANA, include_punctuation); }
function isKanji(str, include_punctuation=true) { return isStringOfSystem(str, KANJI, include_punctuation); }
function isPunctuation(str) { return isStringOfSystem(str, PUNCTUATION, false); }
function isRomaji(str, include_punctuation=true) { return [...str].every((char) => _isCharRomaji(char, include_punctuation)); }

exports.splitKanaString = splitKanaString;
exports.isHiragana = isHiragana;
exports.isKatakana = isKatakana;
exports.isKanji = isKanji;
exports.isPunctuation = isPunctuation;
exports.isRomaji = isRomaji;