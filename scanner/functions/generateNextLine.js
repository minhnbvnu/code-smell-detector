function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}