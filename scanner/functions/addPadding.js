function addPadding({ padding = {}, value = "" } = {}) {
  return value.padStart(padding.length, padding.char);
}