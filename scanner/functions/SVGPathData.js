function SVGPathData(content) {
  this.commands = SVGPathData.parse(content);
}