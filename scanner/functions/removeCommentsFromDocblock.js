function removeCommentsFromDocblock(docblock) {
  return docblock
    .trim('\n ')
    .replace(/^\/\*+/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map(function(line) {
      return line.trim().replace(/^\* ?/, '');
    })
    .join('\n');
}