function _getNameAndExtension (name) {
  let frags = name.split('.')
  let ext = ''
  if (frags.length > 1) {
    ext = last(frags)
    name = frags.slice(0, frags.length - 1).join('.')
  }
  return [name, ext]
}