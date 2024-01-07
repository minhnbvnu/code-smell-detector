function getFloat16Decoder() {
	  // Algorithm is based off of
	  // http://www.fox-toolkit.org/ftp/fasthalffloatconversion.pdf
	  // Cache lookup tables
	  var mantisaTable = computeFloat16MantisaTable();
	  var exponentTable = computeFloat16ExponentTable();
	  var offsetTable = computeFloat16OffsetTable();
	  return function (quantizedArray) {
	    var buffer = new ArrayBuffer(4 * quantizedArray.length);
	    var bufferUint32View = new Uint32Array(buffer);

	    for (var index = 0; index < quantizedArray.length; index++) {
	      var float16Bits = quantizedArray[index];
	      var float32Bits = mantisaTable[offsetTable[float16Bits >> 10] + (float16Bits & 0x3ff)] + exponentTable[float16Bits >> 10];
	      bufferUint32View[index] = float32Bits;
	    }

	    return new Float32Array(buffer);
	  };
	}