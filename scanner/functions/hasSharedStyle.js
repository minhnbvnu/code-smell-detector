function hasSharedStyle(artboard) {
  return !!artboard.firstLayer().sharedStyle()
}