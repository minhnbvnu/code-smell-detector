function prefixRE(words) {
    return new RegExp("^(?:" + words.join("|") + ")", "i");
  }