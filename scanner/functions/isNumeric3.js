function isNumeric3(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}