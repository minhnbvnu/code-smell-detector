function _prepareTmpDirRemoveCallback(name, opts) {
  const removeFunction = opts.unsafeCleanup ? _rmdirRecursiveSync : fs.rmdirSync.bind(fs);
  const removeCallback = _prepareRemoveCallback(removeFunction, name);

  if (!opts.keep) {
    _removeObjects.unshift(removeCallback);
  }

  return removeCallback;
}