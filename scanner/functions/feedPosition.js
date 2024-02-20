function feedPosition(position, str, len) {
  const start = position.index
  const end = (position.index = start + len)
  for (let i = start; i < end; i++) {
    const char = str.charAt(i)
    if (char === '\n') {
      position.line++
      position.column = 0
    } else {
      position.column++
    }
  }
}