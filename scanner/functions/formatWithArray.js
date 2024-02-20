function formatWithArray(text, values) {
  return text.replace(ARRAY_INDEX_RE, function (orignal, matched) {
    const index = parseInt(matched);
    if (index < values.length) {
      return values[index];
    }
    // not match index, return orignal text
    return orignal;
  });
}