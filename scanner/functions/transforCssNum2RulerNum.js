function transforCssNum2RulerNum (cssValue) {
  var rulerNum = cssValue;

  if (typeof cssValue === 'number') {
    rulerNum = cssValue;
  } else if (cssValue === 'pixel') {
    rulerNum = 'pixel';  // 客户端自己去转换pixel
  } else if (typeof cssValue === 'string' && cssValue.match(/^[-+]?[0-9]*\.?[0-9]+px$/)) {
    rulerNum = parseFloat(cssValue) + 'px';
  }
  return rulerNum
}