function shiftSortOrder(str = "", codePoint) {
  let newString = "";
  for (let i = 0; i < str.length; i++) {
    const isLast = i === str.length - 1;
    let char = str[i];
    if (isLast) {
      char = String.fromCodePoint(char.codePointAt(0) + codePoint);
    }
    newString += char;
  }
  return newString;
}