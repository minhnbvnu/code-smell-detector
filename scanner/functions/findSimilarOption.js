function findSimilarOption(optionKey, loaders) {
    const lowerCaseOptionKey = optionKey.toLowerCase();
    let bestSuggestion = "";
    for (const loader of loaders) {
      for (const key in loader.options) {
        if (optionKey === key) {
          return `Did you mean '${loader.id}.${key}'?`;
        }
        const lowerCaseKey = key.toLowerCase();
        const isPartialMatch = lowerCaseOptionKey.startsWith(lowerCaseKey) || lowerCaseKey.startsWith(lowerCaseOptionKey);
        if (isPartialMatch) {
          bestSuggestion = bestSuggestion || `Did you mean '${loader.id}.${key}'?`;
        }
      }
    }
    return bestSuggestion;
  }