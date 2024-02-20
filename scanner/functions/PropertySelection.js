function PropertySelection(properties) {
  var path = properties.path;
  var startOffset = properties.startOffset;
  var endOffset = properties.endOffset || properties.startOffset;
  if (!path || !_.isNumber(startOffset)) {
    throw new Error('Invalid arguments: `path` and `startOffset` are mandatory');
  }
  this.range = new Range(
    new Coordinate(path, startOffset),
    new Coordinate(path, endOffset)
  );
  this.reverse = properties.reverse;
  this._internal = {};
  Object.freeze(this);
}