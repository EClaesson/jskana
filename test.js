const jskana = require('./jskana');

test('splitKanaString', () => {
    expect(jskana.splitKanaString('あっさり')).toEqual(['あっ', 'さ', 'り']);
    expect(jskana.splitKanaString('モーツァルト')).toEqual(['モー', 'ツァ', 'ル', 'ト']);
    expect(jskana.splitKanaString('会人本月長')).toEqual(['会', '人', '本', '月', '長']);
    expect(jskana.splitKanaString('モー人本あっ')).toEqual(['モー', '人', '本', 'あっ']);
});

test('isHiragana', () => {
    expect(jskana.isHiragana('「かに さん。 にぎりめし より、 おれ が ひろった かき の たね の ほう が、 いい よ。 ')).toBe(true);
    expect(jskana.isHiragana('「うまい もも こっちゃ こい。 にがい もも あっちゃ いけ。」 と いったら、 ')).toBe(true);

    expect(jskana.isHiragana('アメリカ')).toBe(false);
    expect(jskana.isHiragana('「うまい もも こっちゃ こい。 にがい もも NOT HIRAGANA あっちゃ いけ。」 と いったら、 ')).toBe(false);
});

test('isKatakana', () => {
    expect(jskana.isKatakana('アメリカ')).toBe(true);
    expect(jskana.isKatakana('モーツァルト')).toBe(true);

    expect(jskana.isKatakana('モーツァルトかに さん。')).toBe(false);
    expect(jskana.isKatakana('アメリカ NOT KATAKANA')).toBe(false);
});

test('isKanji', () => {
    expect(jskana.isKanji('日一大年中')).toBe(true);
    expect(jskana.isKanji('会人本月長')).toBe(true);

    expect(jskana.isKanji('会人本アメリカ月長')).toBe(false);
    expect(jskana.isKanji('日一大 NOT KANJI 年中')).toBe(false);
});

test('isPunctuation', () => {
    expect(jskana.isPunctuation('【】〈〉『』')).toBe(true);
    expect(jskana.isPunctuation('〇〜 〪  〫  〬  〭')).toBe(true);

    expect(jskana.isPunctuation('こっちゃ こい。')).toBe(false);
    expect(jskana.isPunctuation('『NOT PUNCTUATION』')).toBe(false);
});

test('isRomaji', () => {
    expect(jskana.isRomaji('porukadottosutingurei')).toBe(true);
    expect(jskana.isRomaji('ｗａｇａｍａｍａ ｒａｋｉａ ')).toBe(true);

    expect(jskana.isRomaji('うまい もも こっちゃ こい。')).toBe(false);
    expect(jskana.isRomaji('アメリカ〪')).toBe(false);
});

test('hiraganaToKatakana', () => {
    expect(jskana.hiraganaToKatakana('「うまい もも こっちゃ こい。 にがい もも あっちゃ いけ。」 と いったら、 ')).toBe('「ウマイ モモ コッチャ コイ。 ニガイ モモ アッチャ イケ。」 ト イッタラ、 ');
});

test('katakanaToHiragana', () => {
    expect(jskana.katakanaToHiragana('「ウマイ モモ コッチャ コイ。 ニガイ モモ アッチャ イケ。」 ト イッタラ、 ')).toBe('「うまい もも こっちゃ こい。 にがい もも あっちゃ いけ。」 と いったら、 ');
});

test('kanaToRomaji', () => {
    expect(jskana.kanaToRomaji('こちゃに れもんを いれます。')).toBe('kochani remonwo iremasu。');
    expect(jskana.kanaToRomaji('ネクライトーキー')).toBe('nekuraitoki');
});