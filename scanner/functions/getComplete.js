function getComplete (percentage) {
    return padLeft('', (percentage * getProgressWidth()), self.theme.complete)
  }