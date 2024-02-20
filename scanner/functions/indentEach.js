function* indentEach(indent, lines) {
  for (const line of lines) {
    if (Array.isArray(line)) {
      yield* indentEach(indent + 1, line);
    } else {
      const padding = '    '.repeat(indent);
      yield* line.split('\n').map(subline => (subline === '' ? '' : padding + subline));
    }
  }
}