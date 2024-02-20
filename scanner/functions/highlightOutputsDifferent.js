function highlightOutputsDifferent(o1, o2) {
    var minLen = Math.min(o1.length, o2.length);
    for (var i = 0; i < minLen; ++i)
      if (o1[i].style != o2[i].style || o1[i].text != o2[i].text) return i;
    if (o1.length > minLen || o2.length > minLen) return minLen;
  }