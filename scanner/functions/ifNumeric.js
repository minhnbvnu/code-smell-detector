function ifNumeric(val, alt) {
  return (typeof val === "number" && !isNaN(val)) ? val : alt;
}