function fontAndLinesDiffer(a, b) {
  if (a === b) {
    return false;
  }
  if (a.font !== b.font) {
    if (a.font === null) {
      return true;
    }
    if (b.font === null) {
      return true;
    }

    if (
      a.font.fontFamily !== b.font.fontFamily ||
      a.font.fontSize !== b.font.fontSize ||
      a.font.fontWeight !== b.font.fontWeight ||
      a.font.fontStyle !== b.font.fontStyle
    ) {
      return true;
    }
  }
  return arrayDiffer(a.lines, b.lines);
}