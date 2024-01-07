function stft_(signal, frameLength, frameStep, fftLength, windowFn) {
	  if (windowFn === void 0) {
	    windowFn = hannWindow;
	  }

	  if (fftLength == null) {
	    fftLength = enclosingPowerOfTwo(frameLength);
	  }

	  var framedSignal = frame(signal, frameLength, frameStep);
	  var windowedSignal = mul(framedSignal, windowFn(frameLength));
	  var output = [];

	  for (var i = 0; i < framedSignal.shape[0]; i++) {
	    output.push(rfft(slice$2(windowedSignal, [i, 0], [1, frameLength]), fftLength));
	  }

	  return concat(output);
	}