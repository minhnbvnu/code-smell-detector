function nodeTypeAnalyzer(node) {
    if (matcher(node) === true) {
      foundMatchingChild = true;
      return false;
    }
  }