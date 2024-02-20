function createSourceCodeErrorMessage(code, e) {
  var sourceLines = code.split('\n');
  // e.lineNumber is non-standard so we can't depend on its availability. If
  // we're in a browser where it isn't supported, don't even bother trying to
  // format anything. We may also hit a case where the line number is reported
  // incorrectly and is outside the bounds of the actual code. Handle that too.
  if (!e.lineNumber || e.lineNumber > sourceLines.length) {
    return '';
  }
  var erroneousLine = sourceLines[e.lineNumber - 1];

  // Removes any leading indenting spaces and gets the number of
  // chars indenting the `erroneousLine`
  var indentation = 0;
  erroneousLine = erroneousLine.replace(/^\s+/, function(leadingSpaces) {
    indentation = leadingSpaces.length;
    return '';
  });

  // Defines the number of characters that are going to show
  // before and after the erroneous code
  var LIMIT = 30;
  var errorColumn = e.column - indentation;

  if (errorColumn > LIMIT) {
    erroneousLine = '... ' + erroneousLine.slice(errorColumn - LIMIT);
    errorColumn = 4 + LIMIT;
  }
  if (erroneousLine.length - errorColumn > LIMIT) {
    erroneousLine = erroneousLine.slice(0, errorColumn + LIMIT) + ' ...';
  }
  var message = '\n\n' + erroneousLine + '\n';
  message += new Array(errorColumn - 1).join(' ') + '^';
  return message;
}