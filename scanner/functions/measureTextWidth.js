function measureTextWidth(svgTextElement) {
  var result = svgTextElement.getBBox();
  return result.width;
}