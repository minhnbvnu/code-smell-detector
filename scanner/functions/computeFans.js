function computeFans(shape, dataFormat) {
	  if (dataFormat === void 0) {
	    dataFormat = 'channelsLast';
	  }

	  var fanIn;
	  var fanOut;
	  checkDataFormat(dataFormat);

	  if (shape.length === 2) {
	    fanIn = shape[0];
	    fanOut = shape[1];
	  } else if ([3, 4, 5].indexOf(shape.length) !== -1) {
	    if (dataFormat === 'channelsFirst') {
	      var receptiveFieldSize = arrayProd(shape, 2);
	      fanIn = shape[1] * receptiveFieldSize;
	      fanOut = shape[0] * receptiveFieldSize;
	    } else if (dataFormat === 'channelsLast') {
	      var _receptiveFieldSize = arrayProd(shape, 0, shape.length - 2);

	      fanIn = shape[shape.length - 2] * _receptiveFieldSize;
	      fanOut = shape[shape.length - 1] * _receptiveFieldSize;
	    }
	  } else {
	    var shapeProd = arrayProd(shape);
	    fanIn = Math.sqrt(shapeProd);
	    fanOut = Math.sqrt(shapeProd);
	  }

	  return [fanIn, fanOut];
	}