function getFileDocBlock(commentsForFile) {
  var docblock;
  commentsForFile.some(function(comment, i) {
    if (comment.loc.start.line === 1) {
      var lines = comment.value.split('\n');
      var inCopyrightBlock = false;
      var filteredLines = lines.filter(function(line) {
        if (!!line.match(/^\s*\*\s+Copyright \(c\)/)) {
          inCopyrightBlock = true;
        }

        var hasProvides = !!line.match(/^\s*\*\s+@provides/);
        var hasFlow = !!line.match(/^\s*\*\s+@flow/);

        if (hasFlow || hasProvides) {
          inCopyrightBlock = false;
        }

        return !inCopyrightBlock && !hasFlow && !hasProvides;
      });
      docblock = filteredLines.join('\n');
      return true;
    }
  });
  return stripStaticUpstreamWarning(docblock);
}