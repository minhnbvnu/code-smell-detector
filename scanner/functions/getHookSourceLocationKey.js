function getHookSourceLocationKey({
  fileName,
  lineNumber,
  columnNumber
}) {
  if (fileName == null || lineNumber == null || columnNumber == null) {
    throw Error('Hook source code location not found.');
  }

  return `${fileName}:${lineNumber}:${columnNumber}`;
}