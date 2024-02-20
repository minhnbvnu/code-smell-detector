function wordRegExp(words, end) {
      return new RegExp((end ? "" : "^") + "(?:" + words.join("|") + ")" + (end ? "$" : "\\b"));
    }