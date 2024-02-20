function processFoldedBlock(block) {
  var lines = block.lines
  var children = block.children
  var str = lines.join(' ')
  var chunks = [str]
  for (var i = 0, len = children.length; i < len; ++i) {
    chunks.push(processFoldedBlock(children[i]))
  }
  return chunks.join('\n')
}