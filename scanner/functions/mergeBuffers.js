function mergeBuffers(channelBuffer, rLength) {
	                var result = new Float64Array(rLength);
	                var offset = 0;
	                var lng = channelBuffer.length;

	                for (var i = 0; i < lng; i++) {
	                    var buffer = channelBuffer[i];
	                    result.set(buffer, offset);
	                    offset += buffer.length;
	                }

	                return result;
	            }