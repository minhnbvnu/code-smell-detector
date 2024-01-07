function decodeWeights(buffer, specs) {
	  // TODO(adarob, cais): Support quantization.
	  var out = {};
	  var float16Decode;
	  var offset = 0;

	  for (var _iterator = _createForOfIteratorHelperLoose(specs), _step; !(_step = _iterator()).done;) {
	    var spec = _step.value;
	    var name = spec.name;
	    var dtype = spec.dtype;
	    var shape = spec.shape;
	    var size = sizeFromShape(shape);
	    var values = void 0;

	    if ('quantization' in spec) {
	      var quantization = spec.quantization;

	      if (quantization.dtype === 'uint8' || quantization.dtype === 'uint16') {
	        if (!('min' in quantization && 'scale' in quantization)) {
	          throw new Error("Weight " + spec.name + " with quantization " + quantization.dtype + " " + "doesn't have corresponding metadata min and scale.");
	        }
	      } else if (quantization.dtype === 'float16') {
	        if (dtype !== 'float32') {
	          throw new Error("Weight " + spec.name + " is quantized with " + quantization.dtype + " " + ("which only supports weights of type float32 not " + dtype + "."));
	        }
	      } else {
	        throw new Error("Weight " + spec.name + " has unknown " + ("quantization dtype " + quantization.dtype + ". ") + "Supported quantization dtypes are: " + "'uint8', 'uint16', and 'float16'.");
	      }

	      var quantizationSizeFactor = DTYPE_VALUE_SIZE_MAP[quantization.dtype];
	      var byteBuffer = buffer.slice(offset, offset + size * quantizationSizeFactor);
	      var quantizedArray = quantization.dtype === 'uint8' ? new Uint8Array(byteBuffer) : new Uint16Array(byteBuffer);

	      if (dtype === 'float32') {
	        if (quantization.dtype === 'uint8' || quantization.dtype === 'uint16') {
	          values = new Float32Array(quantizedArray.length);

	          for (var i = 0; i < quantizedArray.length; i++) {
	            var v = quantizedArray[i];
	            values[i] = v * quantization.scale + quantization.min;
	          }
	        } else if (quantization.dtype === 'float16') {
	          if (float16Decode === undefined) {
	            float16Decode = getFloat16Decoder();
	          }

	          values = float16Decode(quantizedArray);
	        } else {
	          throw new Error("Unsupported quantization type " + quantization.dtype + " " + "for weight type float32.");
	        }
	      } else if (dtype === 'int32') {
	        if (quantization.dtype !== 'uint8' && quantization.dtype !== 'uint16') {
	          throw new Error("Unsupported quantization type " + quantization.dtype + " " + "for weight type int32.");
	        }

	        values = new Int32Array(quantizedArray.length);

	        for (var _i = 0; _i < quantizedArray.length; _i++) {
	          var _v = quantizedArray[_i];
	          values[_i] = Math.round(_v * quantization.scale + quantization.min);
	        }
	      } else {
	        throw new Error("Unsupported dtype in weight '" + name + "': " + dtype);
	      }

	      offset += size * quantizationSizeFactor;
	    } else if (dtype === 'string') {
	      var _size = sizeFromShape(spec.shape);

	      values = [];

	      for (var _i2 = 0; _i2 < _size; _i2++) {
	        var byteLength = new Uint32Array(buffer.slice(offset, offset + NUM_BYTES_STRING_LENGTH))[0];
	        offset += NUM_BYTES_STRING_LENGTH;
	        var bytes = new Uint8Array(buffer.slice(offset, offset + byteLength));
	        values.push(bytes);
	        offset += byteLength;
	      }
	    } else {
	      var dtypeFactor = DTYPE_VALUE_SIZE_MAP[dtype];

	      var _byteBuffer = buffer.slice(offset, offset + size * dtypeFactor);

	      if (dtype === 'float32') {
	        values = new Float32Array(_byteBuffer);
	      } else if (dtype === 'int32') {
	        values = new Int32Array(_byteBuffer);
	      } else if (dtype === 'bool') {
	        values = new Uint8Array(_byteBuffer);
	      } else if (dtype === 'complex64') {
	        values = new Float32Array(_byteBuffer);
	        var real = new Float32Array(values.length / 2);
	        var image = new Float32Array(values.length / 2);

	        for (var _i3 = 0; _i3 < real.length; _i3++) {
	          real[_i3] = values[_i3 * 2];
	          image[_i3] = values[_i3 * 2 + 1];
	        }

	        var realTensor = tensor(real, shape, 'float32');
	        var imageTensor = tensor(image, shape, 'float32');
	        out[name] = complex(realTensor, imageTensor);
	        realTensor.dispose();
	        imageTensor.dispose();
	      } else {
	        throw new Error("Unsupported dtype in weight '" + name + "': " + dtype);
	      }

	      offset += size * dtypeFactor;
	    }

	    if (dtype !== 'complex64') {
	      out[name] = tensor(values, shape, dtype);
	    }
	  }

	  return out;
	}