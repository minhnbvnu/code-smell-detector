function assignSuspenseBoundaryID(responseState) {
              var generatedID = responseState.nextSuspenseID++;
              return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
            }