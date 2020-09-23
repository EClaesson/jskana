const HIRAGANA_CHARCODE_START = 0x3040;
const HIRAGANA_CHARCODE_END = 0x309f;
const HIRAGANA_CHARCODE_FUNCTIONAL_FOLLOWING = [
    0x3043, 0x3045, 0x3047, 0x3049, 0x3083, 0x3085,
    0x3087, 0x308e, 0x3095, 0x3096, 0x309d, 0x309e,
];
const HIRAGANA_CHARCODE_FUNCTIONAL_PRECEDING = [
    0x3063,
];

const KATAKANA_CHARCODE_START = 0x30a0;
const KATAKANA_CHARCODE_END = 0x30ff;
const KATAKANA_CHARCODE_FUNCTIONAL_FOLLOWING = [
    0x30a1, 0x30a3, 0x30a5, 0x30a7, 0x30a9, 0x30ab,
    0x30e3, 0x30e5, 0x30e7, 0x30ee, 0x30f5, 0x30f6,
    0x30fc, 0x30fd, 0x30fe,
];
const KATAKANA_CHARCODE_FUNCTIONAL_PRECEDING = [
    0x30c3,
];

const KANA_FUNCTIONAL_FOLLOWING_CHARCODES = [
    HIRAGANA_CHARCODE_FUNCTIONAL_FOLLOWING,
    KATAKANA_CHARCODE_FUNCTIONAL_FOLLOWING,
];

const KANA_FUNCTIONAL_PRECEDING_CHARCODES = [
    HIRAGANA_CHARCODE_FUNCTIONAL_PRECEDING,
    KATAKANA_CHARCODE_FUNCTIONAL_PRECEDING,
];

const KANJI_CHARCODE_START = 0x4e00;
const KANJI_CHARCODE_END = 0x9faf;

const PUNCTUATION_CHARCODE_START = 0x3000;
const PUNCTUATION_CHARCODE_END = 0x303f;

const ROMAJI_CHARCODE_RANGES = [
    [0x41, 0x5a],     // A-Z
    [0x61, 0x7a],     // a-z
    [0xff21, 0xff3a], // Full width roman A-Z
    [0xff41, 0xff5a], // Full width roman a-z
];

const WHITESPACE_CHARCODES = [0x09, 0x0a, 0x0d, 0x20];

const HIRAGANA_ROMAJI_MAPPING = [
    ['あ', 'a'],	['い', 'i'],	['う', 'u'],	['え', 'e'],	['お', 'o'],
    ['か', 'ka'],	['き', 'ki'],	['く', 'ku'],	['け', 'ke'],	['こ', 'ko'],
    ['さ', 'sa'],	['し', 'shi'],	['す', 'su'],	['せ', 'se'],	['そ', 'so'],
    ['た', 'ta'],	['ち', 'chi'],	['つ', 'tsu'],	['て', 'te'],	['と', 'to'],
    ['な', 'na'],	['に', 'ni'],	['ぬ', 'nu'],	['ね', 'ne'],	['の', 'no'],
    ['は', 'ha'],	['ひ', 'hi'],	['ふ', 'fu'],	['へ', 'he'],	['ほ', 'ho'],
    ['ま', 'ma'],	['み', 'mi'],	['む', 'mu'],	['め', 'me'],	['も', 'mo'],
    ['や', 'ya'],	['ゆ', 'yu'],	['よ', 'yo'],	['ら', 'ra'],	['り', 'ri'],
    ['る', 'ru'],	['れ', 're'],	['ろ', 'ro'],	['わ', 'wa'],	['を', 'wo'],
    ['ん', 'n'],	['が', 'ga'],	['ぎ', 'gi'],	['ぐ', 'gu'],	['げ', 'ge'],
    ['ご', 'go'],	['ざ', 'za'],	['じ', 'ji'],	['ず', 'zu'],	['ぜ', 'ze'],
    ['ぞ', 'zo'],	['だ', 'da'],	['ぢ', 'ji'],	['づ', 'zu'],	['で', 'de'],
    ['ど', 'do'],	['ば', 'ba'],	['び', 'bi'],	['ぶ', 'bu'],	['べ', 'be'],
    ['ぼ', 'bo'],	['ぱ', 'pa'],	['ぴ', 'pi'],	['ぷ', 'pu'],	['ぺ', 'pe'],
    ['ぽ', 'po'],	['きゃ', 'kya'],	['きゅ', 'kyu'],	['きょ', 'kyo'],	['しゃ', 'sha'],
    ['しゅ', 'shu'],	['しょ', 'sho'],	['ちゃ', 'cha'],	['ちゅ', 'chu'],	['ちょ', 'cho'],
    ['にゃ', 'nya'],	['にゅ', 'nyu'],	['にょ', 'nyo'],	['ひゃ', 'hya'],	['ひゅ', 'hyu'],
    ['ひょ', 'hyo'],	['みゃ', 'mya'],	['みゅ', 'myu'],	['みょ', 'myo'],	['りゃ', 'rya'],
    ['りゅ', 'ryu'],	['りょ', 'ryo'],	['ぎゃ', 'gya'],	['ぎゅ', 'gyu'],	['ぎょ', 'gyo'],
    ['じゃ', 'ja'],	['じゅ', 'ju'],	['じょ', 'jo'],	['びゃ', 'bya'],	['びゅ', 'byu'],
    ['びょ', 'byo'],	['ぴゃ', 'pya'],	['ぴゅ', 'pyu'],	['ぴょ', 'pyo'],
].sort((a, b) => { return a[1].length < b[1].length ? -1 : 1; });

const ROMAJI_VOWELS = [
    'a', 'e', 'i', 'o', 'u', 'y',
];

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

function _isCharFunctional(str, includePreceding=true) {
    const charCode = str.charCodeAt(0);

    for(let i = 0; i < KANA_FUNCTIONAL_FOLLOWING_CHARCODES.length; i++) {
        let system = KANA_FUNCTIONAL_FOLLOWING_CHARCODES[i];

        if(includePreceding) {
            system = system.concat(KANA_FUNCTIONAL_PRECEDING_CHARCODES[i]);
        }

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

function _isCharRomaji(str, includePunctuation) {
    for(let i = 0; i < ROMAJI_CHARCODE_RANGES.length; i++) {
        const range = ROMAJI_CHARCODE_RANGES[i];

        const charCode = str.charCodeAt(0);
        const rangeStart = range[0];
        const rangeEnd = range[1];
        const isOfSystem = (charCode >= rangeStart && charCode <= rangeEnd) || _isCharWhitespace(str);

        if(isOfSystem || (isPunctuation(str) && includePunctuation)) {
            return true;
        }
    }


    return false;
}

function _systemConvertChar(char, fromSystem, toSystem) {
    const kanaSystemDiff = 0x30a0 - 0x3040;
    let charCode = char.charCodeAt(0);

    if(fromSystem === HIRAGANA && toSystem === KATAKANA) {
        charCode += kanaSystemDiff;
    } else if(fromSystem === KATAKANA && toSystem === HIRAGANA) {
        charCode -= kanaSystemDiff;
    }

    return String.fromCharCode(charCode);
}

function _systemConvertString(str, fromSystem, toSystem) {
    let converted = '';

    if(fromSystem === ROMAJI) {
        if(toSystem === HIRAGANA) {
            return _romajiToHiragana(str);
        } else {
            return _systemConvertString(_romajiToHiragana(str), HIRAGANA, KATAKANA);
        }
    }

    [...str].forEach((char) => {
        if(_isCharWhitespace(char) || !isStringOfSystem(char, fromSystem)) {
            converted += char;
        } else {
            converted += _systemConvertChar(char, fromSystem, toSystem);
        }
    });

    return converted;
}

function _hiraganaCharToRomaji(char) {
    for(let i = 0; i < HIRAGANA_ROMAJI_MAPPING.length; i++) {
        if(HIRAGANA_ROMAJI_MAPPING[i][0] === char) {
            return HIRAGANA_ROMAJI_MAPPING[i][1];
        }
    }

    return '';
}

function _romajiToHiragana(str) {
    let remaining = str.slice();
    let hiragana = '';

    while(remaining.length > 0) {
        let found = false;

        if(remaining.length >= 2 && remaining[0] === remaining[1] && !ROMAJI_VOWELS.includes(remaining[0])) {
            hiragana += 'っ';
            remaining = remaining.substring(1);
        }

        for(let i = HIRAGANA_ROMAJI_MAPPING.length - 1; i >= 0; i--) {
            let mapping = HIRAGANA_ROMAJI_MAPPING[i];

            if(remaining.startsWith(mapping[1])) {
                hiragana += mapping[0];
                remaining = remaining.substring(mapping[1].length);
                found = true;
            }
        }

        if(!found) {
            hiragana += remaining[0];
            remaining = remaining.substring(1);
        }
    }

    return hiragana;
}

function isStringOfSystem(str, system, includePunctuation) {
    if(system === ROMAJI) {
        return isRomaji(str, includePunctuation);
    } else {
        return [...str].every((char) => {
            const charCode = char.charCodeAt(0);
            const isOfSystem = (charCode >= _WRITINGSYSTEM_START[system]
                && charCode <= _WRITINGSYSTEM_END[system]) || _isCharWhitespace(char);

            if(includePunctuation) {
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
    let allPreceding = [];

    for(let system of KANA_FUNCTIONAL_PRECEDING_CHARCODES) {
        allPreceding = allPreceding.concat(system);
    }

    [...str].forEach((char) => {
        if(current.length > 0 && !(current.length === 1
            && allPreceding.includes(current.charCodeAt(0)))
            && !_isCharFunctional(char, false)) {
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

function kanaToRomaji(str) {
    const hiragana = katakanaToHiragana(str);
    const parts = splitKanaString(hiragana);

    let romaji = '';

    parts.forEach((part) => {
        if(_isCharWhitespace(part) || !isHiragana(part, false)) {
            romaji += part;
        } else {
            let hasSokuon = part[0] === 'っ';

            if(hasSokuon) {
                part = part.substring(1);
            }

            let thisRomaji = _hiraganaCharToRomaji(part);

            if(hasSokuon) {
                thisRomaji = thisRomaji[0] + thisRomaji;
            }

            romaji += thisRomaji;
        }
    });

    return romaji;
}

function isHiragana(str, includePunctuation=true) { return isStringOfSystem(str, HIRAGANA, includePunctuation); }
function isKatakana(str, includePunctuation=true) { return isStringOfSystem(str, KATAKANA, includePunctuation); }
function isKanji(str, includePunctuation=true) { return isStringOfSystem(str, KANJI, includePunctuation); }
function isPunctuation(str) { return isStringOfSystem(str, PUNCTUATION, false); }
function isRomaji(str, includePunctuation=true) { return [...str].every((char) => _isCharRomaji(char, includePunctuation)); }

function hiraganaToKatakana(str) { return _systemConvertString(str, HIRAGANA, KATAKANA); }
function katakanaToHiragana(str) { return _systemConvertString(str, KATAKANA, HIRAGANA); }

function romajiToHiragana(str) { return _systemConvertString(str, ROMAJI, HIRAGANA); }
function romajiToKatakana(str) { return _systemConvertString(str, ROMAJI, KATAKANA); }

module.exports = {
    splitKanaString,
    isHiragana,
    isKatakana,
    isKanji,
    isPunctuation,
    isRomaji,
    hiraganaToKatakana,
    katakanaToHiragana,
    kanaToRomaji,
    romajiToHiragana,
    romajiToKatakana,
}
