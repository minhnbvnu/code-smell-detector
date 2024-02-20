function relativeToAbsolute(file, url) {
  // Regex from https://stackoverflow.com/a/19709846
  // This will match the most common prefixes we care about: "http://", "https://", "//"
  let absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // If we don't have a file URL or the sourcemap URL is absolute, then return the sourcemap URL.
  if (!file || absoluteUrlRegex.test(url)) {
    return url;
  }

  // Otherwise, find the sourcemap URL relative to the original file.
  let dir = file.split('/');
  dir.pop();
  dir.push(url);
  return dir.join('/');
}