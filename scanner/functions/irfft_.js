function irfft_(input) {
	  var innerDimensionSize = input.shape[input.shape.length - 1];
	  var batch = input.size / innerDimensionSize;
	  var ret;

	  if (innerDimensionSize <= 2) {
	    var complexInput = reshape(input, [batch, innerDimensionSize]);
	    ret = ifft(complexInput);
	  } else {
	    // The length of unique components of the DFT of a real-valued signal
	    // is 2 * (input_len - 1)
	    var outputShape = [batch, 2 * (innerDimensionSize - 1)];
	    var realInput = reshape(real(input), [batch, innerDimensionSize]);
	    var imagInput = reshape(imag(input), [batch, innerDimensionSize]);
	    var realConjugate = reverse(slice$2(realInput, [0, 1], [batch, innerDimensionSize - 2]), 1);
	    var imagConjugate = mul(reverse(slice$2(imagInput, [0, 1], [batch, innerDimensionSize - 2]), 1), scalar(-1));
	    var r = concat([realInput, realConjugate], 1);
	    var i = concat([imagInput, imagConjugate], 1);

	    var _complexInput = reshape(complex(r, i), [outputShape[0], outputShape[1]]);

	    ret = ifft(_complexInput);
	  }

	  ret = real(ret); // reshape the result if the input is 3D tensor.

	  if (input.rank === 3 && input.shape[0] !== 0) {
	    var temp = ret;
	    var _batch = input.shape[0];
	    ret = reshape(ret, [_batch, ret.shape[0] / _batch, ret.shape[1]]);
	    temp.dispose();
	  }

	  return ret;
	}