function extractFontAndLines(font, text) {
  return { font: extractFont(font), lines: text.split(newLine) };
}