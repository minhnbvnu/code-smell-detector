function getRangeOperator(version) {
  const result = basicSemverOperatorRegex.exec(version);
  return result ? result[1] || '' : '^';
}