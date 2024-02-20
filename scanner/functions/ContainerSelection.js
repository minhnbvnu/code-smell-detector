function ContainerSelection(properties) {
  // Note: not calling the super ctor as it freezes the instance
  var containerId = properties.containerId;
  var startPath = properties.startPath;
  var endPath = properties.endPath || properties.startPath;
  var startOffset = properties.startOffset;
  var endOffset = properties.endOffset || properties.startOffset;
  if (!containerId || !startPath || !_.isNumber(startOffset)) {
    throw new Error('Invalid arguments: `containerId`, `startPath` and `startOffset` are mandatory');
  }

  // TODO: validate arguments
  this.containerId = containerId;
  this.range = new Range(
    new Coordinate(startPath, startOffset),
    new Coordinate(endPath, endOffset)
  );
  this.reverse = properties.reverse;
  this._internal = {};
  Object.freeze(this);
}