function checkLink (pagePath, url) {
  var absPath;
  var content;
  var hash;
  var headingMatch;
  var headingRegex;
  var headingIds;
  var urlPath;

  // Relative path.
  if (url.indexOf('.') === 0) {
    // Check page exists.
    urlPath = url.split('#')[0];
    absPath = path.resolve(pagePath, `../${urlPath}`);
    if (!fs.existsSync(absPath)) { return false; }
    if (url.indexOf('#') === -1) { return true; }

    // Check hash / anchor heading.
    headingIds = [];
    hash = url.split('#')[1];
    headingRegex = /#+\s+(.*?)\n/g;
    content = fs.readFileSync(absPath, 'utf-8');
    headingMatch = headingRegex.exec(content);
    while (headingMatch !== null) {
      headingIds.push(convertHeading(headingMatch[1]));
      headingMatch = headingRegex.exec(content);
    }
    return headingIds.indexOf(hash) !== -1;
  }

  return true;
}