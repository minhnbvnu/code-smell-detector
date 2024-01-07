function cleanResultLine(resultLine) {
  resultLine = getText(resultLine);

  return resultLine[resultLine.length - 1] === '\n'
    ? resultLine.slice(0, -1)
    : resultLine;
}