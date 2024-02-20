function watchInViewport(elt, offset, cb) {
    if (isVisible(elt, offset)) {
      watches.remove(elt);
      cb(elt);
    }
  }