function normalizeToBase (string) {
    string = string.toString();
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
  }