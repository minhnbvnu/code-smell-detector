function initContainer(item, drawBorder) {
    var container = document.createElement('section');
    var cstyle = container.style;
    var width = item.rect[2] - item.rect[0];
    var height = item.rect[3] - item.rect[1];

    var bWidth = item.borderWidth || 0;
    if (bWidth) {
      width = width - 2 * bWidth;
      height = height - 2 * bWidth;
      cstyle.borderWidth = bWidth + 'px';
      var color = item.color;
      if (drawBorder && color) {
        cstyle.borderStyle = 'solid';
        cstyle.borderColor = Util.makeCssRgb(Math.round(color[0] * 255),
                                             Math.round(color[1] * 255),
                                             Math.round(color[2] * 255));
      }
    }
    cstyle.width = width + 'px';
    cstyle.height = height + 'px';
    return container;
  }