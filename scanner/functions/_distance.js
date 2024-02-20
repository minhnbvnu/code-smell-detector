function _distance(str1, str2) {
    if (str1 === null && str2 === null) {
      throw "Trying to compare two null values";
    }
    if (str1 === null || str2 === null)
      return 0;
    str1 = String(str1);
    str2 = String(str2);
    const distance = levenshtein(str1, str2);
    if (str1.length > str2.length) {
      return 1 - distance / str1.length;
    } else {
      return 1 - distance / str2.length;
    }
  }