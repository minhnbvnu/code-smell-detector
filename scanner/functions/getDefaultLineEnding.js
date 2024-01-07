function getDefaultLineEnding() {
  switch (atom.config.get('line-ending-selector.defaultLineEnding')) {
    case 'LF':
      return '\n';
    case 'CRLF':
      return '\r\n';
    case 'OS Default':
    default:
      return helpers.getProcessPlatform() === 'win32' ? '\r\n' : '\n';
  }
}