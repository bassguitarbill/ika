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

const verbs = [
  new IkaVerb([["食", "た"], "べ", "る"], IkaVerbType.Ichidan),
  new IkaVerb([["会", "あ"], "う"], IkaVerbType.Godan),
  new IkaVerb([["待", "ま"], "つ"], IkaVerbType.Godan),
  new IkaVerb(["と", "る"], IkaVerbType.Godan),
  new IkaVerb([["読", "よ"], "む"], IkaVerbType.Godan),
  new IkaVerb([["遊", "あそ"], "ぶ"], IkaVerbType.Godan),
  new IkaVerb([["死", "し"], "ぬ"], IkaVerbType.Godan),
  new IkaVerb([["書", "か"], "く"], IkaVerbType.Godan),
  new IkaVerb([["行", "い"], "く"], IkaVerbType.Godan, { te: [["行", "い"], "って"] }),
  new IkaVerb([["泳", "およ"], "ぐ"], IkaVerbType.Godan),
  new IkaVerb([["話", "はな"], "す"], IkaVerbType.Godan),
  new IkaVerb(["す", "る"], IkaVerbType.Irregular),
  new IkaVerb([["来", "く"], "る"], IkaVerbType.Irregular),
]

const table = document.createElement("table")
document.body.appendChild(table)

const headerRow = document.createElement("tr")
table.appendChild(headerRow)

const dict = document.createElement("th")
dict.innerHTML = "Dictionary Form"
headerRow.appendChild(dict)

const te = document.createElement("th")
te.innerHTML = "Te Form"
headerRow.appendChild(te)

const shortPresNeg = document.createElement("th")
shortPresNeg.innerHTML = "Short Negative"
headerRow.appendChild(shortPresNeg)

const shortPastAff = document.createElement("th")
shortPastAff.innerHTML = "Short Past Affirmative"
headerRow.appendChild(shortPastAff)

const shortPastNeg = document.createElement("th")
shortPastNeg.innerHTML = "Short Past Negative"
headerRow.appendChild(shortPastNeg)

verbs.forEach(verb => {
  const row = document.createElement("tr")
  table.appendChild(row)

  const dict = document.createElement("td")
  dict.innerHTML = ikaStringToHTMLString(verb.dictionaryForm)
  row.appendChild(dict)

  const te = document.createElement("td")
  te.innerHTML = ikaStringToHTMLString(verb.te)
  row.appendChild(te)

  const shortPresNeg = document.createElement("td")
  shortPresNeg.innerHTML = ikaStringToHTMLString(verb.presentNegativeShortForm)
  row.appendChild(shortPresNeg)

  const shortPastAff = document.createElement("td")
  shortPastAff.innerHTML = ikaStringToHTMLString(verb.pastAffirmativeShortForm)
  row.appendChild(shortPastAff)

  const shortPastNeg = document.createElement("td")
  shortPastNeg.innerHTML = ikaStringToHTMLString(verb.pastNegativeShortForm)
  row.appendChild(shortPastNeg)

})
