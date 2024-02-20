function Coordinate(path, offset, after) {
  this.path = path;
  this.offset = offset;
  this.after = after;
  if (!_.isArray(path)) {
    throw new Error('Invalid arguments: path should be an array.');
  }
  if (!_.isNumber(offset) || offset < 0) {
    throw new Error('Invalid arguments: offset must be a positive number.');
  }
  // make sure that path can't be changed afterwards
  if (!Object.isFrozen(path)) {
    Object.freeze(path);
  }
  Object.freeze(this);
}