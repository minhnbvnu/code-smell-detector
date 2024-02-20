function supportRelativeURL(file, url) {
  if (!file) return url
  const dir = path.dirname(file)
  const match = /^\w+:\/\/[^/]*/.exec(dir)
  const protocol = match ? match[0] : ''
  return protocol + path.resolve(dir.slice(protocol.length), url)
}