function matchAnyCase(char) {
    if (!isLetter(char)) {
      // Don't mess with special characters like [.
      return char;
    }

    return '[' + char.toLowerCase() + char.toUpperCase() + ']';
  }