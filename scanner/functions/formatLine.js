function formatLine (line) {
  // add the leftmost pipe (jest is missing it) and also pad with a space or hyphen, as appropriate
  return line[0] === '-' ? '|-' + line + '\n' : '| ' + line + '\n'
}