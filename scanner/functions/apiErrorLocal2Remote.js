function apiErrorLocal2Remote(e) {
	    return {
	        type: SpecialArgType.API_ERROR,
	        errorData: bufferToTransferrableObject(e.writeToBuffer())
	    };
	}