function linkto(longname, linkText, cssClass, fragmentId) {
  if (linkText) {
    return helper.linkto(longname, linkText, cssClass, fragmentId);
  }

  if (!longname.includes('module:ol/')) {
    return helper.linkto(longname, linkText, cssClass, fragmentId);
  }

  // check for `Array<foo|bar>` types (but allow `Array<foo>|Array<bar>` types)
  let openBrackets = 0;
  let parseTypes = false;
  for (const c of longname) {
    if (c === '<') {
      openBrackets += 1;
      continue;
    }
    if (c === '>') {
      openBrackets -= 1;
      continue;
    }
    if (openBrackets > 0 && c === '|') {
      parseTypes = true;
      break;
    }
  }
  if (parseTypes) {
    // collections or generics with unions get parsed by catharsis and
    // will unfortunately include long module:ol/foo names
    return helper.linkto(longname, '', cssClass, fragmentId);
  }

  // handle union types
  if (longname.includes('|')) {
    return longname
      .split('|')
      .map((part) => linkto(part, '', cssClass, fragmentId))
      .join(' | ');
  }

  const match = longname.match(/(.+?)\.?<(.+)>$/);
  // handle generics and collections
  if (match) {
    return (
      linkto(match[1], '', cssClass, fragmentId) +
      '&lt;' +
      linkto(match[2], '', cssClass, fragmentId) +
      '>'
    );
  }

  return helper.linkto(
    longname,
    htmlsafe(getShortName(longname)),
    cssClass,
    fragmentId,
  );
}