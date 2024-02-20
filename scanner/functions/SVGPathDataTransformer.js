function SVGPathDataTransformer(transformFunction) {
  // Ensure new were used
  if(!(this instanceof SVGPathDataTransformer)) {
    return new (SVGPathDataTransformer.bind.apply(SVGPathDataTransformer,
      [SVGPathDataTransformer].concat([].slice.call(arguments, 0))));
  }

  // Transform function needed
  if('function' !== typeof transformFunction) {
    throw new Error('Please provide a transform callback to receive commands.');
  }
  this._transformer = transformFunction.apply(null, [].slice.call(arguments, 1));
  if('function' !== typeof this._transformer) {
    throw new Error('Please provide a valid transform (returning a function).');
  }

  // Parent constructor
  TransformStream.call(this, {
    objectMode: true
  });
}