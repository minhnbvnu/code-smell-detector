function splitHeader(content) {
  var lines = content.split(/\r?\n/);
  for (var i = 1; i < lines.length - 1; ++i) {
    if (lines[i] === '---') {
      break;
    }
  }
  return {
    header: i < lines.length - 1 ?
      lines.slice(1, i + 1).join('\n') : null,
    content: lines.slice(i + 1).join('\n')
  };
}