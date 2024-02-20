function formatSourceForDisplay(fileName, lineNumber) {
  const BEFORE_SLASH_RE = /^(.*)[\\\/]/;
  let nameOnly = fileName.replace(BEFORE_SLASH_RE, ''); // In DEV, include code for a common special case:
  // prefer "folder/index.js" instead of just "index.js".

  if (/^index\./.test(nameOnly)) {
    const match = fileName.match(BEFORE_SLASH_RE);

    if (match) {
      const pathBeforeSlash = match[1];

      if (pathBeforeSlash) {
        const folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
        nameOnly = folderName + '/' + nameOnly;
      }
    }
  }

  return `${nameOnly}:${lineNumber}`;
}