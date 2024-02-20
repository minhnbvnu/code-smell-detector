function wordIsProperty(word) {
      word = word.toLowerCase();
      return word in propertyKeywords || word in fontProperties;
    }