function extractor(string) {
  string = string || ''

  var lines = string.split(/(\r?\n)/)
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse(string)
  } else {
    return { attributes: {}, body: string }
  }
}