function collapseLayoutIntoViews(layout) {
  layout.forEach(({
    view,
    frame
  }) => view.setFrame(frame));
}