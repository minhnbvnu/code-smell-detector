function TensorBuffer(shape, dtype, values) {
	    var _this = this;

	    this.dtype = dtype;
	    this.shape = shape.slice();
	    this.size = sizeFromShape(shape);

	    if (values != null) {
	      var n = values.length;
	      assert(n === this.size, function () {
	        return "Length of values '" + n + "' does not match the size " + ("inferred by the shape '" + _this.size + "'.");
	      });
	    }

	    if (dtype === 'complex64') {
	      throw new Error("complex64 dtype TensorBuffers are not supported. Please create " + "a TensorBuffer for the real and imaginary parts separately and " + "call tf.complex(real, imag).");
	    }

	    this.values = values || getArrayFromDType(dtype, this.size);
	    this.strides = computeStrides(shape);
	  }