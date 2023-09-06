import { ikaStringToHTMLString,  IkaStr } from './IkaStr.js'
import { IkaVerb, verbForm, verbForms } from './IkaVerb.js'
import { setupFuriganaToggle } from './furiganaToggle.js'
import loadDictionary, { Dictionary } from './loadDictionary.js'

document.addEventListener("DOMContentLoaded", () => {
  setupFuriganaToggle()
  loadDictionary().then(dict => generateTable(dict))
})

const forms: Array<verbForm> = [
"dictionaryForm",
"te",
"presentNegativeShortForm",
"pastAffirmativeShortForm",
"pastNegativeShortForm",
"desire",
"potential",
]

function generateTable(dict: Dictionary) {
  const verbCategories = Object.keys(dict.verbs).filter(category => category.includes("Genki"))
  const verbs = verbCategories.reduce<Array<IkaVerb>>((acc, category) => acc.concat(dict.verbs[category]), [])
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
