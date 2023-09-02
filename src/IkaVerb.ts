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

  get suruStem(): IkaStr {
    if (this.dictionaryForm.length == 2) return ["し"]
    const start = this.dictionaryForm.slice(0, -2)
    return start.concat(["し"])
  }

  get kuruStem(): IkaStr {
    if (this.dictionaryForm.length == 2) return [["来", "き"]]
    const start = this.dictionaryForm.slice(0, -2)
    return start.concat([["来", "き"]])
  }

  get suruTe(): IkaStr {
    if (this.dictionaryForm.length == 2) return ["し", "て"]
    const start = this.dictionaryForm.slice(0, -2)
    return start.concat(["し", "て"])
  }

  get kuruTe(): IkaStr {
    if (this.dictionaryForm.length == 2) return [["来", "き"], "て"]
    const start = this.dictionaryForm.slice(0, -2)
    return start.concat([["来", "き"], "て"])
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
}
