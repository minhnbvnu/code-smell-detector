function getContentWidth(element, context) {
    var boxWidth = element.offsetWidth;

    var bl = getPixelValue(element, 'borderLeftWidth',  context) || 0;
    var br = getPixelValue(element, 'borderRightWidth', context) || 0;
    var pl = getPixelValue(element, 'paddingLeft',      context) || 0;
    var pr = getPixelValue(element, 'paddingRight',     context) || 0;

    return boxWidth - bl - br - pl - pr;
  }