function overrideCreateWriteStream() {
  fs.createWriteStream = function (path, options) {
    const output = realCreateWriteStream(path, options);
    // disable _writev, this will over shadow WriteStream.prototype._writev
    if (realBinding._mockedBinding) {
      output._writev = undefined;
    }
    return output;
  };
}