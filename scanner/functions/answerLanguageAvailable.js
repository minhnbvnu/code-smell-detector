function answerLanguageAvailable() {
  return global.localStorage.setItem("hasAnsweredLanguageAvailable", lastAskedLanguageAvailable);
}