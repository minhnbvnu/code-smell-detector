function makeConnections(dv) {
    if (!dv.showDifferences) return;

    if (dv.svg) {
      clear(dv.svg);
      var w = dv.gap.offsetWidth;
      attrs(dv.svg, "width", w, "height", dv.gap.offsetHeight);
    }
    if (dv.copyButtons) clear(dv.copyButtons);

    var vpEdit = dv.edit.getViewport(), vpOrig = dv.orig.getViewport();
    var outerTop = dv.mv.wrap.getBoundingClientRect().top
    var sTopEdit = outerTop - dv.edit.getScrollerElement().getBoundingClientRect().top + dv.edit.getScrollInfo().top
    var sTopOrig = outerTop - dv.orig.getScrollerElement().getBoundingClientRect().top + dv.orig.getScrollInfo().top;
    for (var i = 0; i < dv.chunks.length; i++) {
      var ch = dv.chunks[i];
      if (ch.editFrom <= vpEdit.to && ch.editTo >= vpEdit.from &&
          ch.origFrom <= vpOrig.to && ch.origTo >= vpOrig.from)
        drawConnectorsForChunk(dv, ch, sTopOrig, sTopEdit, w);
    }
  }