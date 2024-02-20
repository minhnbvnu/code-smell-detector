function filterButter(input, inputPos, output, outputPos, nSamples, kernel) {

	        while ((nSamples--) != 0) {
	            output[outputPos] = input[inputPos + 0] * kernel[0]
	                - output[outputPos - 1] * kernel[1] + input[inputPos - 1]
	                * kernel[2] - output[outputPos - 2] * kernel[3]
	                + input[inputPos - 2] * kernel[4];
	            ++outputPos;
	            ++inputPos;
	        }
	    }