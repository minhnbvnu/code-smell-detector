function maybeMultiline(regexp) {
    return /\\s|\\n|\n|\\W|\\D|\[\^/.test(regexp.source)
  }