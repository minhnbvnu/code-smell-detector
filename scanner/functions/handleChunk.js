function handleChunk(responseArray) {
        // If we haven't set the timestamp yet, slice it off of this chunk
        if (!timestamp) {
          timestamp = (new Uint32Array(responseArray.buffer, 0, 1))[0],
          responseArray = new Uint8Array(responseArray.buffer, 4);
        }
        // Each byte in the responseArray represents two values in the canvas
        for (var i = 0; i < responseArray.byteLength; i++) {
          canvas[offset + 2 * i] = responseArray[i] >> 4;
          canvas[offset + 2 * i + 1] = responseArray[i] & 15;
        }
        offset += responseArray.byteLength * 2;
      }