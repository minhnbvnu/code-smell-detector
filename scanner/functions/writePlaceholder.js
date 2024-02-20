function writePlaceholder(destination, responseState, id) {
              writeChunk(destination, placeholder1);
              writeChunk(destination, responseState.placeholderPrefix);
              var formattedID = stringToChunk(id.toString(16));
              writeChunk(destination, formattedID);
              return writeChunkAndReturn(destination, placeholder2);
            }