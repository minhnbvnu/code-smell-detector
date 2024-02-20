function formatLines(...lines) {
  return [...indentEach(0, lines)].join('\n') + '\n';
}