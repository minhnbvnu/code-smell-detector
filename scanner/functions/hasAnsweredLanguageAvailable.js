function hasAnsweredLanguageAvailable() {
  return global.localStorage.getItem("hasAnsweredLanguageAvailable") === lastAskedLanguageAvailable;
}