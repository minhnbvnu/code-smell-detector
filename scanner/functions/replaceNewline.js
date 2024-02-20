function replaceNewline(value, newline, structuredEscape) {
  // avoid regex when possible.
  if (value.indexOf('\\') === -1) {
    return value;
  }
  if (structuredEscape)
     newline = new RegExp(newline.source + '|\\\\' + structuredEscape, newline.flags);
  return value.replace(newline, replaceNewlineReplace);
}