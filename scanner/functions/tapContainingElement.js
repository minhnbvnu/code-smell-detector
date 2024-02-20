function tapContainingElement(ele, allowSelf) {
  var climbEle = ele;
  for (var x = 0; x < 6; x++) {
    if (!climbEle) break;
    if (climbEle.tagName === 'LABEL') return climbEle;
    climbEle = climbEle.parentElement;
  }
  if (allowSelf !== false) return ele;
}