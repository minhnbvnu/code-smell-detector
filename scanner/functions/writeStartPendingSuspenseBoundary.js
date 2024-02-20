function writeStartPendingSuspenseBoundary(destination, responseState, id) {
              writeChunk(destination, startPendingSuspenseBoundary1);
              if (id === null) {
                throw new Error("An ID must have been assigned before we can complete the boundary.");
              }
              writeChunk(destination, id);
              return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
            }