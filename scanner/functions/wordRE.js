function wordRE(words) {
    return new RegExp("^(?:" + words.join("|") + ")$", "i");
  }