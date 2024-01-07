function titleAlign(align, position, reverse) {
  /** @type {CanvasTextAlign} */
  let ret = _toLeftRightCenter(align);
  if ((reverse && position !== 'right') || (!reverse && position === 'right')) {
    ret = reverseAlign(ret);
  }
  return ret;
}