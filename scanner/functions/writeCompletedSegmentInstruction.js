function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
              writeChunk(destination, responseState.startInlineScript);
              if (!responseState.sentCompleteSegmentFunction) {
                responseState.sentCompleteSegmentFunction = true;
                writeChunk(destination, completeSegmentScript1Full);
              } else {
                writeChunk(destination, completeSegmentScript1Partial);
              }
              writeChunk(destination, responseState.segmentPrefix);
              var formattedID = stringToChunk(contentSegmentID.toString(16));
              writeChunk(destination, formattedID);
              writeChunk(destination, completeSegmentScript2);
              writeChunk(destination, responseState.placeholderPrefix);
              writeChunk(destination, formattedID);
              return writeChunkAndReturn(destination, completeSegmentScript3);
            }