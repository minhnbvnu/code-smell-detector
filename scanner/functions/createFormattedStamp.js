function createFormattedStamp(text, value) {
    var text = createStamp();
    return padFor(text, maxDurLength) + colorStamp(text, value) + bar;
  }