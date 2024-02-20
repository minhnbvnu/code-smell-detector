function extractDescription(readme) {
  if (typeof readme !== 'string' || readme === '') {
    return undefined;
  }

  // split into lines
  const lines = readme.trim().split('\n').map(line => line.trim());

  // find the start of the first paragraph, ignore headings
  let start = 0;
  for (; start < lines.length; start++) {
    const line = lines[start];
    if (line && line.match(/^(#|$)/)) {
      // line isn't empty and isn't a heading so this is the start of a paragraph
      start++;
      break;
    }
  }

  // skip newlines from the header to the first line
  while (start < lines.length && !lines[start]) {
    start++;
  }

  // continue to the first non empty line
  let end = start;
  while (end < lines.length && lines[end]) {
    end++;
  }

  return lines.slice(start, end).join(' ');
}