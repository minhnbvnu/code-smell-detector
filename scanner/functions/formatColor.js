function formatColor(color, strToFormat, formatter) {
  return color ? formatter[color](strToFormat) : strToFormat;
}