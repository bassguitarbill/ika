import { IkaStr, hiraganaChart } from './IkaStr.js'
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
    public exceptions?: IkaVerbExceptions
  ) {}

  get lastChar(): string {
    return this.dictionaryForm.slice(-1)[0] as string
  }

  get stem() {
    switch(this.verbType) {
      case IkaVerbType.Ichidan:
	return this.dictionaryForm.slice(0, -1)
      case IkaVerbType.Godan:
        return this.dictionaryForm.slice(0, -1).concat([hiraganaChart[this.lastChar].i])
      case IkaVerbType.Irregular:
	return ["c"]
    }
  }

  get positivePresentLongForm(): IkaStr {
    return this.stem.concat(["ます"])
  }
}
