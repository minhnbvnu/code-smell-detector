function _theme(_) {
  return arguments.length ? (theme = _, redraw()) : theme;
}