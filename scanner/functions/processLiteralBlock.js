function processLiteralBlock(block) {
  var lines = block.lines
  var children = block.children
  var str = lines.join('\n')
  for (var i = 0, len = children.length; i < len; ++i) {
    str += processLiteralBlock(children[i])
  }
  return str
}