import { IkaVerb, IkaVerbType, ikaStringToHTMLString } from './IkaStr.js'

const tabemasu = new IkaVerb(
  [["食", "た"], "べ", "る"],
  IkaVerbType.Ichidan,
).positivePresentLongForm
const tabemasuDiv = document.createElement('span')
tabemasuDiv.innerHTML = ikaStringToHTMLString(tabemasu)
document.body.appendChild(tabemasuDiv)

const ikimasu = new IkaVerb(
  [["行", "い"], "く"],
  IkaVerbType.Godan,
).positivePresentLongForm
const ikimasuDiv = document.createElement('span')
ikimasuDiv.innerHTML = ikaStringToHTMLString(ikimasu)
document.body.appendChild(ikimasuDiv)
