function processBuffer() {
      return top.subLanguage !== undefined ? processSubLanguage() : processKeywords();
    }