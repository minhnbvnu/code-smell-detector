function resetImage(evt) {
    if (this.currentScale == 1)
      return;
    var node = this.zoomNode, left, top, trans, w, h, pos, start, end, parent, flowTag;
    trans = getComputedTranslate(node);
    parent = node.parentNode;
    w = node.clientWidth * trans.scaleX;
    h = node.clientHeight * trans.scaleX;
    pos = getPosition(node);
    start = {
      left: (1 - trans.scaleX) * trans.offsetX + pos.left + trans.translateX,
      top: (1 - trans.scaleX) * trans.offsetY + pos.top + trans.translateY
    };
    end = {
      left: start.left + w,
      top: start.top + h
    };
    left = start.left;
    top = start.top;
    flowTag = overFlow(parent, {
      start: start,
      end: end
    });
    switch (flowTag) {
    case 1:
      left = viewScope.start.left;
      top = viewScope.end.top - h;
      break;
    case 2:
      left = viewScope.start.left;
      top = viewScope.start.top;
      break;
    case 3:
      left = viewScope.end.left - w;
      top = viewScope.end.top - h;
      break;
    case 4:
      left = viewScope.end.left - w;
      top = viewScope.start.top;
      break;
    case 5:
      top = viewScope.end.top - h;
      break;
    case 6:
      top = viewScope.start.top;
      break;
    case 7:
      left = viewScope.end.left - w;
      break;
    case 8:
      left = viewScope.start.left;
      break;
    }
    if (w < parent.clientWidth) {
      left = pos.left - (trans.scaleX - 1) * node.clientWidth / 2;
    }
    if (h < parent.clientHeight) {
      top = pos.top - (trans.scaleX - 1) * node.clientHeight / 2;
    }
    node.style.webkitTransitionDuration = '100ms';
    node.style.webkitTransform = generateTranslate(trans.translateX + left - start.left, trans.translateY + top - start.top, 0, trans.scaleX);
  }