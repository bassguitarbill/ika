import { ikaStringToHTMLString, ikaStringToKanji } from './IkaStr.js'
import { IkaVerb, IkaVerbType, verbForm, verbForms } from './IkaVerb.js'
import { setupFuriganaToggle } from './furiganaToggle.js'

document.addEventListener("DOMContentLoaded", () => {
  setupFlashcards()
  setupFuriganaToggle()
})

function chooseFrom<T>(arr: Array<T>): T {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

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
  // "dictionaryForm",
"te",
"presentNegativeShortForm",
"pastAffirmativeShortForm",
"pastNegativeShortForm",
"desire",
"potential",
]

let currentVerb: IkaVerb;
let currentForm: verbForm;

function startQuiz() {
  document.querySelector("#startQuiz")!.remove()
  const prompt = document.querySelector("#prompt")!

  const button = document.createElement("button")
  button.id = "showAnswer"
  button.innerText = "Show Answer"
  button.addEventListener("click", showAnswer)

  prompt.insertAdjacentElement("afterend", button)

  askQuestion()
}

function askQuestion() {
  currentVerb = chooseFrom(verbs)
  currentForm = chooseFrom(forms)

  const prompt= `<span>What is the ${verbForms[currentForm]} form of ${ikaStringToHTMLString(currentVerb.dictionaryForm)}?</span>`
  document.querySelector("#prompt")!.innerHTML = prompt
  document.querySelector("#answer")!.innerHTML = ""
  document.querySelector("#nextQuestion")?.remove()
}

function showAnswer() {
  const answer = ikaStringToHTMLString(currentVerb[currentForm])
  document.querySelector("#answer")!.innerHTML = answer

  const button = document.createElement("button")
  button.id = "nextQuestion"
  button.innerText = "Next Question"
  button.addEventListener("click", askQuestion)

  document.querySelector("#quiz")!.appendChild(button)
}

function setupFlashcards() {
  const quiz = document.querySelector("#quiz")!

  const button = document.createElement("button")
  button.id = "startQuiz"
  button.innerText = "Start Quiz"
  button.addEventListener("click", startQuiz)
  quiz.appendChild(button)

  const prompt = document.createElement("div")
  prompt.id = "prompt"
  quiz.appendChild(prompt)

  const answer = document.createElement("div")
  answer.id = "answer"
  quiz.appendChild(answer)
}
