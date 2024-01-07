function rfft_(input, fftLength) {
	  assert(input.dtype === 'float32', function () {
	    return "The dtype for rfft() must be real value but got " + input.dtype;
	  });
	  var innerDimensionSize = input.shape[input.shape.length - 1];
	  var batch = input.size / innerDimensionSize;
	  var adjustedInput;

	  if (fftLength != null && fftLength < innerDimensionSize) {
	    // Need to crop
	    var begin = input.shape.map(function (v) {
	      return 0;
	    });
	    var size = input.shape.map(function (v) {
	      return v;
	    });
	    size[input.shape.length - 1] = fftLength;
	    adjustedInput = slice$2(input, begin, size);
	    innerDimensionSize = fftLength;
	  } else if (fftLength != null && fftLength > innerDimensionSize) {
	    // Need to pad with zeros
	    var zerosShape = input.shape.map(function (v) {
	      return v;
	    });
	    zerosShape[input.shape.length - 1] = fftLength - innerDimensionSize;
	    adjustedInput = concat([input, zeros(zerosShape)], input.shape.length - 1);
	    innerDimensionSize = fftLength;
	  } else {
	    adjustedInput = input;
	  } // Complement the input with zero imaginary numbers.


	  var zerosInput = zerosLike(adjustedInput);
	  var complexInput = reshape(complex(adjustedInput, zerosInput), [batch, innerDimensionSize]);
	  var ret = fft(complexInput); // Exclude complex conjugations. These conjugations are put symmetrically.

	  var half = Math.floor(innerDimensionSize / 2) + 1;
	  var realValues = real(ret);
	  var imagValues = imag(ret);
	  var realComplexConjugate = split$1(realValues, [half, innerDimensionSize - half], realValues.shape.length - 1);
	  var imagComplexConjugate = split$1(imagValues, [half, innerDimensionSize - half], imagValues.shape.length - 1);
	  var outputShape = adjustedInput.shape.slice();
	  outputShape[adjustedInput.shape.length - 1] = half;
	  return reshape(complex(realComplexConjugate[0], imagComplexConjugate[0]), outputShape);
	}