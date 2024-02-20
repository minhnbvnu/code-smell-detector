function bufferLocal2Remote(buff) {
	    return {
	        type: SpecialArgType.BUFFER,
	        data: bufferToTransferrableObject(buff)
	    };
	}