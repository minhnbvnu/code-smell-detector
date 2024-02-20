function writeChunk(destination, chunk) {
              if (chunk.length === 0) {
                return;
              }
              if (chunk.length > VIEW_SIZE) {
                if (writtenBytes > 0) {
                  destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
                  currentView = new Uint8Array(VIEW_SIZE);
                  writtenBytes = 0;
                }
                destination.enqueue(chunk);
                return;
              }
              var bytesToWrite = chunk;
              var allowableBytes = currentView.length - writtenBytes;
              if (allowableBytes < bytesToWrite.length) {
                if (allowableBytes === 0) {
                  destination.enqueue(currentView);
                } else {
                  currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes);
                  destination.enqueue(currentView);
                  bytesToWrite = bytesToWrite.subarray(allowableBytes);
                }
                currentView = new Uint8Array(VIEW_SIZE);
                writtenBytes = 0;
              }
              currentView.set(bytesToWrite, writtenBytes);
              writtenBytes += bytesToWrite.length;
            }