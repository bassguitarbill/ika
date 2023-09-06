import { ikaStringToHTMLString, ikaStringToKanji } from './IkaStr.js'
import { IkaVerb, IkaVerbType, verbForm, verbForms } from './IkaVerb.js'
import { setupFuriganaToggle, toggleFurigana } from './furiganaToggle.js'
import loadDictionary from './loadDictionary.js'

let verbs: Array<IkaVerb> = []
document.addEventListener("DOMContentLoaded", () => {
  setupFuriganaToggle()
  loadDictionary().then(dict => setupFlashcards(dict.verbs["Example"]))
})

function chooseFrom<T>(arr: Array<T>): T {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

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
  toggleFurigana()

  const githubIssueLink = document.querySelector("#currentPromptIssueURL")!
  githubIssueLink.setAttribute("href", githubIssueUrl())
}

function showAnswer() {
  const answer = ikaStringToHTMLString(currentVerb[currentForm])
  document.querySelector("#answer")!.innerHTML = answer

  if (!document.querySelector("#nextQuestion")) {
    const button = document.createElement("button")
    button.id = "nextQuestion"
    button.innerText = "Next Question"
    button.addEventListener("click", askQuestion)
    document.querySelector("#quiz")!.appendChild(button)
  }
  toggleFurigana()
}

function setupFlashcards(v: Array<IkaVerb>) {
  verbs = v
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

function githubIssueUrl(): string {
  const dictionary = ikaStringToKanji(currentVerb.dictionaryForm)
  const form = verbForms[currentForm]
  const conjugated = ikaStringToKanji(currentVerb[currentForm])
  const title = encodeURI(`${dictionary} in ${form} form shows as ${conjugated}`)
  return `https://github.com/bassguitarbill/ika/issues/new?title=${title}&assignees=bassguitarbill`
}
