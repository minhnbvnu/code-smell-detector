function levenshtein(str1, str2) {
    const current2 = [];
    let prev;
    let value;
    for (let i = 0; i <= str2.length; i++) {
      for (let j = 0; j <= str1.length; j++) {
        if (i && j) {
          if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
            value = prev;
          } else {
            value = Math.min(current2[j], current2[j - 1], prev) + 1;
          }
        } else {
          value = i + j;
        }
        prev = current2[j];
        current2[j] = value;
      }
    }
    return current2.pop();
  }