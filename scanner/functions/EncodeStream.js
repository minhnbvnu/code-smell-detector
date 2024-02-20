function EncodeStream(options) {
  if (!(this instanceof EncodeStream)) return new EncodeStream(options);
  if (options) {
    options.objectMode = true;
  } else {
    options = DEFAULT_OPTIONS;
  }
  Transform.call(this, options);

  var stream = this;
  var encoder = this.encoder = new EncodeBuffer(options);
  encoder.push = function(chunk) {
    stream.push(chunk);
  };
}