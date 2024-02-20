function ignoreLinesToRegex(lines, base = '.') {
  return lines
  // create regex
  .map(line => {
    // remove empty lines, comments, etc
    if (line === '' || line === '!' || line[0] === '#' || WHITESPACE_RE.test(line)) {
      return null;
    }

    let pattern = line;
    let isNegation = false;

    // hide the fact that it's a negation from minimatch since we'll handle this specifically
    // ourselves
    if (pattern[0] === '!') {
      isNegation = true;
      pattern = pattern.slice(1);
    }

    // remove trailing slash
    pattern = (0, (_misc || _load_misc()).removeSuffix)(pattern, '/');

    const regex = mm.makeRe(pattern.trim(), { dot: true, nocase: true });

    if (regex) {
      return {
        base,
        isNegation,
        pattern,
        regex
      };
    } else {
      return null;
    }
  }).filter(Boolean);
}