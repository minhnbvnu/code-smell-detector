function _markRemoved() {
  this._traverseFlags |= _index.SHOULD_SKIP | _index.REMOVED;
  this.node = null;
}