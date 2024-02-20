function Composite(targetGroup, path, optionalParsedPath) {

  var parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);

  this._targetGroup = targetGroup;
  this._bindings = targetGroup.subscribe_(path, parsedPath);

}