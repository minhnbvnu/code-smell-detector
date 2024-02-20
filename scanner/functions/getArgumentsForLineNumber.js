function getArgumentsForLineNumber(editor, fileName, lineNumber) {
  switch (path.basename(editor)) {
    case 'vim':
    case 'mvim':
      return [fileName, '+' + lineNumber];
    case 'atom':
    case 'subl':
    case 'sublime':
      return [fileName + ':' + lineNumber];
    case 'joe':
    case 'emacs':
    case 'emacsclient':
      return ['+' + lineNumber, fileName];
    case 'rmate':
    case 'mate':
    case 'mine':
      return ['--line', lineNumber, fileName];
  }

  // For all others, drop the lineNumber until we have
  // a mapping above, since providing the lineNumber incorrectly
  // can result in errors or confusing behavior.
  return [fileName];
}