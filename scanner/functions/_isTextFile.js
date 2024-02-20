function _isTextFile (f) {
  return new RegExp(`\\.(${TEXTISH.join('|')})$`).exec(f)
}