function maybeDisable() {
    // To find out whether the scrollbar is still visible, we
    // check whether the element under the pixel in the bottom
    // left corner of the scrollbar box is the scrollbar box
    // itself (when the bar is still visible) or its filler child
    // (when the bar is hidden). If it is still visible, we keep
    // it enabled, if it's hidden, we disable pointer events.
    var box = bar.getBoundingClientRect();
    var elt = document.elementFromPoint(box.left + 1, box.bottom - 1);
    if (elt != bar) { bar.style.pointerEvents = "none"; }
    else { delay.set(1000, maybeDisable); }
  }