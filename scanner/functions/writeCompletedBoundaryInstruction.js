function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
              writeChunk(destination, responseState.startInlineScript);
              if (!responseState.sentCompleteBoundaryFunction) {
                responseState.sentCompleteBoundaryFunction = true;
                writeChunk(destination, completeBoundaryScript1Full);
              } else {
                writeChunk(destination, completeBoundaryScript1Partial);
              }
              if (boundaryID === null) {
                throw new Error("An ID must have been assigned before we can complete the boundary.");
              }
              var formattedContentID = stringToChunk(contentSegmentID.toString(16));
              writeChunk(destination, boundaryID);
              writeChunk(destination, completeBoundaryScript2);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, formattedContentID);
              return writeChunkAndReturn(destination, completeBoundaryScript3);
            }