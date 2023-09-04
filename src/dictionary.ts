import { ikaStringToHTMLString,  IkaStr } from './IkaStr.js'
import { IkaVerb, IkaVerbType, verbForm, verbForms } from './IkaVerb.js'
import { setupFuriganaToggle } from './furiganaToggle.js'

document.addEventListener("DOMContentLoaded", () => {
  generateTable()
  setupFuriganaToggle()
})

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
  new IkaVerb([["勉","べん"], ["強", "きょう"],"す", "る"], IkaVerbType.Irregular),
  new IkaVerb([["来", "く"], "る"], IkaVerbType.Irregular),
]

const forms: Array<verbForm> = [
"dictionaryForm",
"te",
"presentNegativeShortForm",
"pastAffirmativeShortForm",
"pastNegativeShortForm",
"desire",
"potential",
]

function generateTable() {
  const table = document.createElement("table")
  document.querySelector("#dictionary")!.appendChild(table)

  const headerRow = document.createElement("tr")
  table.appendChild(headerRow)

  forms.forEach((form: string) => {
    const th = document.createElement("th")
    th.innerText = verbForms[form] 
    headerRow.appendChild(th)
  })

  verbs.forEach(verb => {
    const row = document.createElement("tr")
    table.appendChild(row)

    forms.forEach((form) => {
      const td = document.createElement("td")
      td.innerHTML = ikaStringToHTMLString(verb[form] as IkaStr)
      row.appendChild(td)
    })
  })
}
