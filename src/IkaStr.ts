export type IkaChunk = string | [string, string]
export type IkaStr = Array<IkaChunk>

type verbEndingKana =
"あ" | "い" | "う" | "え" | "お" |
"た" | "ち" | "つ" | "て" | "と" |
"ら" | "り" | "る" | "れ" | "ろ" |
"ま" | "み" | "む" | "め" | "も" |
"ば" | "び" | "ぶ" | "べ" | "ぼ" |
"な" | "に" | "ぬ" | "ね" | "の" |
"か" | "き" | "く" | "け" | "こ" |
"が" | "ぎ" | "ぐ" | "げ" | "ご" |
"さ" | "し" | "す" | "せ" | "そ" 

type englishVowel = "a" | "i" | "u" | "e" | "o"

export const hiraganaChart: { [key: string]: { [key: string]: verbEndingKana } } = [
  ["あ", "い", "う", "え", "お"],
  ["た", "ち", "つ", "て", "と"],
  ["ら", "り", "る", "れ", "ろ"],
  ["ま", "み", "む", "め", "も"],
  ["ば", "び", "ぶ", "べ", "ぼ"],
  ["な", "に", "ぬ", "ね", "の"],
  ["か", "き", "く", "け", "こ"],
  ["が", "ぎ", "ぐ", "げ", "ご"],
  ["さ", "し", "す", "せ", "そ"],
].reduce((acc, row) => {
  const expandedRow = { a: row[0], i: row[1], u: row[2], e: row[3], o: row[4] }
  if (row[0] === "あ") expandedRow.a = "わ"
  return Object.assign(acc, row.reduce((acc2, character) => {
    return Object.assign(acc2, { [character]: expandedRow })
  }, {}))
}, {})

export function ikaStringToHTMLString(ikaString: IkaStr): string {
  return ikaString.reduce((acc: string, x: IkaChunk) => {
    if (typeof x !== 'string') {
      return `${acc}<ruby class="ikaStringFurigana">${x[0]}<rp>(</rp><rt>${x[1]}</rt><rp>)</rp></ruby><span class="ikaStringNoFurigana hidden">${x[0]}</span>`
    } 
    return `${acc}${x}`
  }, "")
}

export function ikaStringToKana(ikaString: IkaStr): string {
  return ikaString.reduce((acc: string, x: IkaChunk) => {
    if (typeof x !== 'string') {
      return `${acc}${x[1]}`
    } 
    return `${acc}${x}`
  }, "")
}

export function ikaStringToKanji(ikaString: IkaStr): string {
  return ikaString.reduce((acc: string, x: IkaChunk) => {
    if (typeof x !== 'string') {
      return `${acc}${x[0]}`
    } 
    return `${acc}${x}`
  }, "")
}

