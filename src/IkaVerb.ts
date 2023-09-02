import { IkaStr, hiraganaChart } from './IkaStr.js'
export enum IkaVerbType {
  Ichidan,
  Godan,
  Irregular
}

export type IkaVerbExceptions = {
  te: IkaStr,
}

const teForms: { [key: string]: string } = {
  う: "って",
  つ: "って",
  る: "って",
  む: "んで",
  ぶ: "んで",
  ぬ: "んで",
  く: "いて",
  ぐ: "いで",
  す: "して",
}

export class IkaVerb {
  constructor(
    public dictionaryForm: IkaStr, 
    public verbType: IkaVerbType,
    public exceptions?: IkaVerbExceptions
  ) {}

  get isSuru(): boolean {
	  return this.dictionaryForm.length >= 2 && 
	    this.dictionaryForm[this.dictionaryForm.length - 2] === "す" &&
	    this.dictionaryForm[this.dictionaryForm.length - 1] === "る"
  }

  get isKuru(): boolean {
    return this.dictionaryForm.length >= 2 && 
	    this.dictionaryForm[this.dictionaryForm.length - 2][0] === "来" &&
	    this.dictionaryForm[this.dictionaryForm.length - 2][1] === "く" &&
	    this.dictionaryForm[this.dictionaryForm.length - 1] === "る"
  }

  irregularStem(suffix: IkaStr) {
    if (this.dictionaryForm.length == 2) return suffix 
    const start = this.dictionaryForm.slice(0, -2)
    return start.concat(suffix)
  }

  get suruStem(): IkaStr {
    return this.irregularStem(["し"])
  }

  get kuruStem(): IkaStr {
    return this.irregularStem([["来", "き"]])
  }

  get suruTe(): IkaStr {
    return this.irregularStem(["し", "て"])
  }

  get kuruTe(): IkaStr {
    return this.irregularStem([["来", "き"], "て"])
  }

  get lastChar(): string {
    return this.dictionaryForm.slice(-1)[0] as string
  }

  get te(): IkaStr {
    if (this.exceptions?.te)
      return this.exceptions.te

    switch(this.verbType) {
      case IkaVerbType.Ichidan:
	return this.dictionaryForm.slice(0, -1).concat(["て"])
      case IkaVerbType.Godan:
        return this.dictionaryForm.slice(0, -1).concat([teForms[this.lastChar]])
      case IkaVerbType.Irregular:
	if (this.isSuru)
	    return this.suruTe
	if (this.isKuru)
	    return this.kuruTe
    }
    console.error(`Invalid verb ${this.dictionaryForm}`)
    return []
  }

  get stem(): IkaStr {
    switch(this.verbType) {
      case IkaVerbType.Ichidan:
	return this.dictionaryForm.slice(0, -1)
      case IkaVerbType.Godan:
        return this.dictionaryForm.slice(0, -1).concat([hiraganaChart[this.lastChar].i])
      case IkaVerbType.Irregular:
	if (this.isSuru)
	    return this.suruStem
	if (this.isKuru)
	    return this.kuruStem

      console.error(`Invalid verb ${this.dictionaryForm}`)
      return []
    }
  }

  get presentAffirmativeLongForm(): IkaStr {
    return this.stem.concat(["ます"])
  }

  get presentNegativeLongForm(): IkaStr {
    return this.stem.concat(["ません"])
  }

  get pastAffirmativeLongForm(): IkaStr {
    return this.stem.concat(["ました"])
  }

  get pastNegativeLongForm(): IkaStr {
    return this.stem.concat(["ませんでした"])
  }

  get presentAffirmativeShortForm(): IkaStr {
    return this.dictionaryForm
  }

  get presentNegativeShortForm(): IkaStr {
    switch(this.verbType) {
      case IkaVerbType.Ichidan:
	return this.dictionaryForm.slice(0, -1).concat(["ない"])
      case IkaVerbType.Godan:
        return this.dictionaryForm.slice(0, -1).concat([hiraganaChart[this.lastChar].a]).concat(["ない"])
      case IkaVerbType.Irregular:
	if (this.isSuru)
	    return this.irregularStem(["しない"])
	if (this.isKuru)
	    return this.irregularStem(["こない"])

      console.error(`Invalid verb ${this.dictionaryForm}`)
      return []
    }
  }

  get pastAffirmativeShortForm(): IkaStr {
    const te = this.te
    const last = (te[te.length - 1] as String).replace("て", "た").replace("で", "だ")
    return te.slice(0, -1).concat(last)
  }

  get pastNegativeShortForm(): IkaStr {
    const presNegShort = this.presentNegativeShortForm
    const last = (presNegShort[presNegShort.length - 1] as String).replace("い", "かった")
    return presNegShort.slice(0, -1).concat(last)
  }
}
