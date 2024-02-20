function filterYule(input, inputPos, output, outputPos, nSamples, kernel) {

	        while ((nSamples--) != 0) {
	            /* 1e-10 is a hack to avoid slowdown because of denormals */
	            output[outputPos] = 1e-10 + input[inputPos + 0] * kernel[0]
	                - output[outputPos - 1] * kernel[1] + input[inputPos - 1]
	                * kernel[2] - output[outputPos - 2] * kernel[3]
	                + input[inputPos - 2] * kernel[4] - output[outputPos - 3]
	                * kernel[5] + input[inputPos - 3] * kernel[6]
	                - output[outputPos - 4] * kernel[7] + input[inputPos - 4]
	                * kernel[8] - output[outputPos - 5] * kernel[9]
	                + input[inputPos - 5] * kernel[10] - output[outputPos - 6]
	                * kernel[11] + input[inputPos - 6] * kernel[12]
	                - output[outputPos - 7] * kernel[13] + input[inputPos - 7]
	                * kernel[14] - output[outputPos - 8] * kernel[15]
	                + input[inputPos - 8] * kernel[16] - output[outputPos - 9]
	                * kernel[17] + input[inputPos - 9] * kernel[18]
	                - output[outputPos - 10] * kernel[19]
	                + input[inputPos - 10] * kernel[20];
	            ++outputPos;
	            ++inputPos;
	        }
	    }