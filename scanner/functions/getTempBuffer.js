function getTempBuffer(size){if(!requestOptions.tempBuffer){const initialSize=Math.max(size,1024);requestOptions.tempBuffer=_malloc(initialSize);requestOptions.tempBufferSize=initialSize}if(requestOptions.tempBufferSize<size){_free(requestOptions.tempBuffer);requestOptions.tempBuffer=_malloc(size);requestOptions.tempBufferSize=size}return requestOptions.tempBuffer}