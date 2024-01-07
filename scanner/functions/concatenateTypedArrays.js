function concatenateTypedArrays(xs) {
	  // TODO(adarob, cais): Support quantization.
	  if (xs === null) {
	    throw new Error("Invalid input value: " + JSON.stringify(xs));
	  }

	  var totalByteLength = 0; // `normalizedXs` is here for this reason: a `TypedArray`'s `buffer'
	  // can have a different byte length from that of the `TypedArray` itself,
	  // for example, when the `TypedArray` is created from an offset in an
	  // `ArrayBuffer`. `normliazedXs` holds `TypedArray`s whose `buffer`s match
	  // the `TypedArray` in byte length. If an element of `xs` does not show
	  // this property, a new `TypedArray` that satisfy this property will be
	  // constructed and pushed into `normalizedXs`.

	  var normalizedXs = [];
	  xs.forEach(function (x) {
	    totalByteLength += x.byteLength; // tslint:disable:no-any

	    normalizedXs.push(x.byteLength === x.buffer.byteLength ? x : new x.constructor(x));

	    if (!(x instanceof Float32Array || x instanceof Int32Array || x instanceof Uint8Array)) {
	      throw new Error("Unsupported TypedArray subtype: " + x.constructor.name);
	    } // tslint:enable:no-any

	  });
	  var y = new Uint8Array(totalByteLength);
	  var offset = 0;
	  normalizedXs.forEach(function (x) {
	    y.set(new Uint8Array(x.buffer), offset);
	    offset += x.byteLength;
	  });
	  return y.buffer;
	}