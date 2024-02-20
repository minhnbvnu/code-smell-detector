function commaSeparatedString(array = [], prefix = '"', postfix = '"') {
  return array.map((value) => `${prefix}${value}${postfix}`).join(", ");
}