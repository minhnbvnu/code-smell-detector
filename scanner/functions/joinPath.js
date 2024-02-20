function joinPath(base, url) {
  return [
    base.replace(trailingSlash, ''),
    base ? url.replace(leadingSlash, '') : url
  ]
    .filter(s => s)
    .join('/');
}