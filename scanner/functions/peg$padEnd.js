function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";

  if (str.length > targetLength) {
    return str;
  }

  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}