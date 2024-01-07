function lineEndingDescription(lineEndings) {
  switch (lineEndingName(lineEndings)) {
    case 'Mixed':
      return 'mixed';
    case 'LF':
      return 'LF (Unix)';
    case 'CRLF':
      return 'CRLF (Windows)';
    default:
      return 'unknown';
  }
}