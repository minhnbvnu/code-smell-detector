function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && isSpace(string.charCodeAt(index))) {}
    return index;
  }