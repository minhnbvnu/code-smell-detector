function getDocBlock(node, commentsForFile, linesForFile) {
  if (node.isSynthesized === true) {
    return '';
  }
  var docblock;
  var prevLine = node.loc.start.line - 1;
  // skip blank lines
  while (linesForFile[prevLine - 1].trim() === '') {
    prevLine--;
  }

  commentsForFile.some(function(comment, i) {
    if (comment.loc.end.line === prevLine) {
      if (comment.type === 'Line') {
        // Don't accept line comments that are separated
        if (prevLine !== node.loc.start.line - 1) {
          return true;
        }
        var line = prevLine;
        docblock = '';
        for (var ii = i; ii >= 0; ii--) {
          var lineComment = commentsForFile[ii];
          if (lineComment.loc.end.line === line) {
            docblock = '//' + lineComment.value +
              (docblock ? '\n' + docblock : '');
            line--;
          } else {
            break;
          }
        }
      } else {
        docblock = stripStaticUpstreamWarning(comment.value);
      }
      return true;
    }
  });
  return docblock;
}