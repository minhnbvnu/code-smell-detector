function processMd(md) {
  return (0, _marked.default)((0, _transformEmojis.default)(md.replace(_const.MARKER_HIDDEN, '')));
}