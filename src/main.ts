import { ikaStringToHTMLString, ikaStringToKanji } from './IkaStr.js'
import { IkaVerb, IkaVerbType } from './IkaVerb.js'

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

const forms = [
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
  document.body.appendChild(table)

  const headerRow = document.createElement("tr")
  table.appendChild(headerRow)

  forms.forEach((form: string) => {
    const th = document.createElement("th")
    th.innerHTML = form 
    headerRow.appendChild(th)
  })

  verbs.forEach(verb => {
    const row = document.createElement("tr")
    table.appendChild(row)

    forms.forEach((form: string) => {
      const td = document.createElement("td")
      td.innerHTML = ikaStringToHTMLString(verb[form],false)
      row.appendChild(td)
    })
  })
}

function setupFuriganaToggle() {
  const furiganaToggle = document.querySelector("#furiganaToggle")

  furiganaToggle.addEventListener("change", e => {
    document.querySelectorAll(".ikaStringNoFurigana").forEach(el => {
      e.target.checked ? el.classList.add("hidden") : el.classList.remove("hidden")
    })
    document.querySelectorAll(".ikaStringFurigana").forEach(el => {
      e.target.checked ? el.classList.remove("hidden") : el.classList.add("hidden")
    })
  })
}
