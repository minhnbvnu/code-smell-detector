function assertNotComplex(tensor, opName) {
	  if (!Array.isArray(tensor)) {
	    tensor = [tensor];
	  }

	  tensor.forEach(function (t) {
	    if (t != null) {
	      assert(t.dtype !== 'complex64', function () {
	        return opName + " does not support complex64 tensors in the CPU backend.";
	      });
	    }
	  });
	}