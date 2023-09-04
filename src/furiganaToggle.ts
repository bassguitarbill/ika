export function toggleFurigana() {
  const furiganaToggle = document.querySelector("#furiganaToggle") as HTMLInputElement

  document.querySelectorAll(".ikaStringNoFurigana").forEach(el => {
    furiganaToggle.checked ? el.classList.add("hidden") : el.classList.remove("hidden")
  })
  document.querySelectorAll(".ikaStringFurigana").forEach(el => {
    furiganaToggle.checked ? el.classList.remove("hidden") : el.classList.add("hidden")
  })
}

export function setupFuriganaToggle() {
  const furiganaToggle = document.querySelector("#furiganaToggle") as HTMLInputElement
  furiganaToggle.addEventListener("change", toggleFurigana)
}
