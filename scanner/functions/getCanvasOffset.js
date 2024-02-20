function getCanvasOffset(pointer) {
  // we need to account for CSS scale, transform, border, padding,
  // and margin in order to get the correct scale and offset of the
  // canvas
  let { canvas, _s } = pointer;
  let rect = canvas.getBoundingClientRect();

  // @see https://stackoverflow.com/a/53405390/2124254
  let transform =
    _s.transform != 'none'
      ? _s.transform.replace('matrix(', '').split(',')
      : [1, 1, 1, 1];
  let transformScaleX = parseFloat(transform[0]);
  let transformScaleY = parseFloat(transform[3]);

  // scale transform applies to the border and padding of the element
  let borderWidth =
    (getPropValue(_s, 'border-left-width') +
      getPropValue(_s, 'border-right-width')) *
    transformScaleX;
  let borderHeight =
    (getPropValue(_s, 'border-top-width') +
      getPropValue(_s, 'border-bottom-width')) *
    transformScaleY;

  let paddingWidth =
    (getPropValue(_s, 'padding-left') +
      getPropValue(_s, 'padding-right')) *
    transformScaleX;
  let paddingHeight =
    (getPropValue(_s, 'padding-top') +
      getPropValue(_s, 'padding-bottom')) *
    transformScaleY;

  return {
    scaleX: (rect.width - borderWidth - paddingWidth) / canvas.width,
    scaleY:
      (rect.height - borderHeight - paddingHeight) / canvas.height,
    offsetX:
      rect.left +
      (getPropValue(_s, 'border-left-width') +
        getPropValue(_s, 'padding-left')) *
        transformScaleX,
    offsetY:
      rect.top +
      (getPropValue(_s, 'border-top-width') +
        getPropValue(_s, 'padding-top')) *
        transformScaleY
  };
}