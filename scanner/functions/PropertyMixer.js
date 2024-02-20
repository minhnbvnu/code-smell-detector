function PropertyMixer(binding, typeName, valueSize) {

  this.binding = binding;
  this.valueSize = valueSize;

  var bufferType = Float64Array,
    mixFunction;

  switch (typeName) {

    case 'quaternion':
      mixFunction = this._slerp;
      break;

    case 'string':
    case 'bool':
      bufferType = Array;
      mixFunction = this._select;
      break;

    default:
      mixFunction = this._lerp;

  }

  this.buffer = new bufferType(valueSize * 4);
  // layout: [ incoming | accu0 | accu1 | orig ]
  //
  // interpolators can use .buffer as their .result
  // the data then goes to 'incoming'
  //
  // 'accu0' and 'accu1' are used frame-interleaved for
  // the cumulative result and are compared to detect
  // changes
  //
  // 'orig' stores the original state of the property

  this._mixBufferRegion = mixFunction;

  this.cumulativeWeight = 0;

  this.useCount = 0;
  this.referenceCount = 0;

}