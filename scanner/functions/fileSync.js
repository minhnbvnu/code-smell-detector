function fileSync(options) {
  var
    args = _parseArguments(options),
    opts = args[0];

  opts.postfix = opts.postfix || '.tmp';

  const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
  const name = tmpNameSync(opts);
  var fd = fs.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
  if (opts.discardDescriptor) {
    fs.closeSync(fd); 
    fd = undefined;
  }

  return {
    name: name,
    fd: fd,
    removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts)
  };
}