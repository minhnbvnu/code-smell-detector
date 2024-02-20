function isJSONStringTypeArray(arr) {
  let firstChar = arr.slice(0, 5).find(entry => entry >= 0x20);
  let lastChars = arr.slice(-5);

  // Buffer.slice() does not make a copy, but we need one since
  // we call reverse()
  if (lastChars instanceof Buffer) {
    lastChars = Buffer.from(lastChars);
  }

  let lastChar = lastChars.reverse().find(entry => entry >= 0x20);

  firstChar = String.fromCharCode(firstChar);
  lastChar = String.fromCharCode(lastChar);

  return (firstChar === '{' && lastChar === '}') || (firstChar === '[' && lastChar === ']');
}