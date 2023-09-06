import { IkaStr } from './IkaStr.js'
import { IkaVerb, IkaVerbExceptions, IkaVerbType } from './IkaVerb.js'
type Dictionary = {
  verbs: {
    [key: string]: Array<IkaVerb>
  }
}

type DictionaryRow = [IkaStr, "Godan" | "Ichidan" | "Irregular", IkaVerbExceptions?]

const verbTypes = {
  "Godan": IkaVerbType.Godan,
  "Ichidan": IkaVerbType.Ichidan,
  "Irregular": IkaVerbType.Irregular
}

function transformVerb(verb: DictionaryRow): IkaVerb {
  const verbType: IkaVerbType = verbTypes[verb[1]]
  return new IkaVerb(verb[0], verbType, verb[2])
}

function transformVerbs(verbs: { [key: string]: Array<DictionaryRow> }): { [key: string]: Array<IkaVerb>} {
  const categories = Object.keys(verbs)
  return categories.reduce((acc, category) => Object.assign(acc, { [category]: verbs[category].map(transformVerb) }), {})
}

export default async function loadDictionary(): Promise<Dictionary> {
  return fetch('/dictionary.json')
    .then(rsp => rsp.json())
    .then(dict => ({ ...dict, verbs: transformVerbs(dict.verbs) }))
}
