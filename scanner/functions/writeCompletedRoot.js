function writeCompletedRoot(destination, responseState) {
              var bootstrapChunks = responseState.bootstrapChunks;
              var i = 0;
              for (; i < bootstrapChunks.length - 1; i++) {
                writeChunk(destination, bootstrapChunks[i]);
              }
              if (i < bootstrapChunks.length) {
                return writeChunkAndReturn(destination, bootstrapChunks[i]);
              }
              return true;
            }