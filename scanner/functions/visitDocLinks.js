function visitDocLinks(filePath, callback) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let lineNumber = 1;
  lines.forEach(line => {
    const parts = line.split('](');

    if (parts.length >= 2) {
      parts.forEach(part => {
        const sections = part.split(')');
        if (sections.length >= 2) {
          callback(filePath, lineNumber, sections[0]); // eslint-disable-line callback-return
        }
      });
    }
    lineNumber++;
  });
}