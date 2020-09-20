# jskana
Japanese kana and romaji conversion.

## Documentation

### Writing system checks

``` isHiragana(str, include_punctuation) ```

Returns _true_ if all characters in _str_ is hiragana or whitespace.

If _include_punctuation_ is _true_, punctuation characters will also be accepted.

``` isKatakana(str, include_punctuation) ```

Returns _true_ if all characters in _str_ is katakana or whitespace.

If _include_punctuation_ is _true_, punctuation characters will also be accepted.

``` isKanji(str, include_punctuation) ```

Returns _true_ if all characters in _str_ is kanji or whitespace.

If _include_punctuation_ is _true_, punctuation characters will also be accepted.

``` isRomaji(str, include_punctuation) ```

Returns _true_ if all characters in _str_ is romaji or whitespace.

If _include_punctuation_ is _true_, punctuation characters will also be accepted.

``` isPunctuation(str) ```

Returns _true_ if all characters in _str_ is punctuation or whitespace.

### String split

``` splitKanaString(str) ```

Splits a hiragana or katakana string into separate characters, grouped with small characters.

Example: 'あっさり' will return ['あっ', 'さ', 'り'].

### Kana conversion

``` hiraganaToKatakana(str) ```

Return a string based on _str_ where all hiragana characters are replaced with katakana.

``` katakanaToHiragana(str) ```

Return a string based on _str_ where all katakana characters are replaced with hiragana.

``` kanaToRomaji(str) ```

Returns a string based on _str_ where all hiragana and katakana are replaced with romaji.

## Examples

```javascript
const jskana = require('jskana');

jskana.isHiragana('かに さん。 にぎりめし より')
> true

jskana.isKatakana('アメリカ XYZ')
> false

jskana.isKanji('日一大年中')
> true

jskana.isPunctuation('『モー人本あっ』')
> false

jskana.splitKanaString('あっさり')
> ['あっ', 'さ', 'り']

jskana.hiraganaToKatakana('「うまい もも こっちゃ こい。 にがい もも あっちゃ いけ。」 と いったら、 ')
> '「ウマイ モモ コッチャ コイ。 ニガイ モモ アッチャ イケ。」 ト イッタラ、 '

jskana.kanaToRomaji('こちゃに れもんを いれます。')
> 'kochani remonwo iremasu。'
```