function regexLastIndexOf(string, pattern, startIndex) {
    for (var i = startIndex == null ? string.length : startIndex; i >= 0; --i)
      if (pattern.test(string.charAt(i))) return i;
    return -1;
  }