function linesEq(line1, line2) {
  if(line1 === line2) return true
  if(!line1) return Object.is(line1, line2)
  if(_.isArray(line1.chars) && _.isArray(line2.chars) && line1.chars.length !== line2.chars.length) return false
  if(!_.isEqual(line1.start, line2.start)) return false
  if(!_.isEqual(line1.end, line2.end)) return false
  if(!_.isEqual(line1.chunks, line2.chunks)) return false
  return _.isEqual(line1.chars, line2.chars)
}