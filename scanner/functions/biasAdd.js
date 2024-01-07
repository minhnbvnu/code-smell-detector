function biasAdd(x, bias, dataFormat) {
	  return tidy(function () {
	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    checkDataFormat(dataFormat);
	    return x.add(reshapeBias(x.rank, bias, dataFormat));
	  });
	}