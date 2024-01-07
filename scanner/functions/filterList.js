function filterList(text) {
    const examples = getMatchingExamples(text);
    listExamples(examples);
    updateHistoryState(text);
  }