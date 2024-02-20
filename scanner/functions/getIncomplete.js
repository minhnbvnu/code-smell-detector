function getIncomplete (percentage) {
    var width = getProgressWidth() - (percentage * getProgressWidth())
    return padRight('', width, self.theme.incomplete)
  }