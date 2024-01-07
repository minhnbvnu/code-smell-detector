function float32ToTypedArray(a, dtype) {
	  if (dtype === 'float32' || dtype === 'complex64') {
	    return a;
	  } else if (dtype === 'int32' || dtype === 'bool') {
	    var result = dtype === 'int32' ? new Int32Array(a.length) : new Uint8Array(a.length);

	    for (var i = 0; i < result.length; ++i) {
	      result[i] = Math.round(a[i]);
	    }

	    return result;
	  } else {
	    throw new Error("Unknown dtype " + dtype);
	  }
	}