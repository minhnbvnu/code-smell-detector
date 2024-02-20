function hasFlag (flag) {
  const position = process.argv.indexOf(flag)
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition)
}