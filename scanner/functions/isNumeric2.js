function isNumeric2(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}