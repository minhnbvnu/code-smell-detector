function assignToTypedArray(data, real, imag, index) {
	  data[index * 2] = real;
	  data[index * 2 + 1] = imag;
	}