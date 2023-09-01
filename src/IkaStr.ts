export type IkaStr = Array<string | [string, string]>

export function uToE(kana: string) {
  switch(kana) {
  case "う":
    return "え"
  case "つ":
    return "て"
  case "る":
    return "れ"
  case "む":
    return "め"
  case "ぶ":
    return "べ"
  case "ぬ":
    return "ね"
  case "く":
    return "け"
  case "ぐ":
    return "げ"
  case "す":
    return "せ"
  }
}

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

const hiraganaChart: { [key: string]: { [key: string]: verbEndingKana } } = [
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
  return Object.assign(acc, row.reduce((acc2, character) => {
    return Object.assign(acc2, { [character]: expandedRow })
  }, {}))
}, {})

console.log(hiraganaChart)
console.log("く with an O", hiraganaChart.く.o)

export enum IkaVerbType {
  Ichidan,
  Godan,
  Irregular
}

export type IkaVerbExceptions = {
  te: IkaStr,
}

export class IkaVerb {
  constructor(
    public dictionaryForm: IkaStr, 
    public verbType: IkaVerbType,
    public exceptions: IkaVerbExceptions
  ) {}

  positivePresentLongForm(): IkaStr {
    switch(this.verbType) {
      case IkaVerbType.Ichidan:
	return ["a"]
      case IkaVerbType.Godan:
	return ["b"]
      case IkaVerbType.Irregular:
	return ["c"]
    }
  }
}
