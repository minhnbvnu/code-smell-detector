function syncScroll(dv, toOrig) {
    // Change handler will do a refresh after a timeout when diff is out of date
    if (dv.diffOutOfDate) {
      if (dv.lockScroll && dv.needsScrollSync == null) dv.needsScrollSync = toOrig
      return false
    }
    dv.needsScrollSync = null
    if (!dv.lockScroll) return true;
    var editor, other, now = +new Date;
    if (toOrig) { editor = dv.edit; other = dv.orig; }
    else { editor = dv.orig; other = dv.edit; }
    // Don't take action if the position of this editor was recently set
    // (to prevent feedback loops)
    if (editor.state.scrollSetBy == dv && (editor.state.scrollSetAt || 0) + 250 > now) return false;

    var sInfo = editor.getScrollInfo();
    if (dv.mv.options.connect == "align") {
      targetPos = sInfo.top;
    } else {
      var halfScreen = .5 * sInfo.clientHeight, midY = sInfo.top + halfScreen;
      var mid = editor.lineAtHeight(midY, "local");
      var around = chunkBoundariesAround(dv.chunks, mid, toOrig);
      var off = getOffsets(editor, toOrig ? around.edit : around.orig);
      var offOther = getOffsets(other, toOrig ? around.orig : around.edit);
      var ratio = (midY - off.top) / (off.bot - off.top);
      var targetPos = (offOther.top - halfScreen) + ratio * (offOther.bot - offOther.top);

      var botDist, mix;
      // Some careful tweaking to make sure no space is left out of view
      // when scrolling to top or bottom.
      if (targetPos > sInfo.top && (mix = sInfo.top / halfScreen) < 1) {
        targetPos = targetPos * mix + sInfo.top * (1 - mix);
      } else if ((botDist = sInfo.height - sInfo.clientHeight - sInfo.top) < halfScreen) {
        var otherInfo = other.getScrollInfo();
        var botDistOther = otherInfo.height - otherInfo.clientHeight - targetPos;
        if (botDistOther > botDist && (mix = botDist / halfScreen) < 1)
          targetPos = targetPos * mix + (otherInfo.height - otherInfo.clientHeight - botDist) * (1 - mix);
      }
    }

    other.scrollTo(sInfo.left, targetPos);
    other.state.scrollSetAt = now;
    other.state.scrollSetBy = dv;
    return true;
  }