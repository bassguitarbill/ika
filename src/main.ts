import { ikaStringToHTMLString, ikaStringToKanji } from './IkaStr.js'
import { IkaVerb, IkaVerbType } from './IkaVerb.js'

const tabemasu = new IkaVerb(
  [["食", "た"], "べ", "る"],
  IkaVerbType.Ichidan,
).presentAffirmativeLongForm
const tabemasuDiv = document.createElement('span')
tabemasuDiv.innerHTML = ikaStringToHTMLString(tabemasu)
document.body.appendChild(tabemasuDiv)

const ikimasu = new IkaVerb(
  [["行", "い"], "く"],
  IkaVerbType.Godan,
).presentAffirmativeLongForm
const ikimasuDiv = document.createElement('span')
ikimasuDiv.innerHTML = ikaStringToHTMLString(ikimasu)
document.body.appendChild(ikimasuDiv)

const suru = new IkaVerb(["す","る"], IkaVerbType.Irregular)
console.dir(suru.presentAffirmativeLongForm)
console.dir(suru.presentNegativeLongForm)

const kuru = new IkaVerb([["来", "く"],"る"], IkaVerbType.Irregular)
console.dir(kuru.presentAffirmativeLongForm)
console.dir(kuru.presentNegativeLongForm)

const study = new IkaVerb([["勉","べん"], ["強","きょう"], "す","る"], IkaVerbType.Irregular)
console.dir(ikaStringToKanji(study.presentAffirmativeLongForm))
console.dir(ikaStringToKanji(study.presentNegativeLongForm))
