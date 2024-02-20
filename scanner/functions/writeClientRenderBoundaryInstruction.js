function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
              writeChunk(destination, responseState.startInlineScript);
              if (!responseState.sentClientRenderFunction) {
                responseState.sentClientRenderFunction = true;
                writeChunk(destination, clientRenderScript1Full);
              } else {
                writeChunk(destination, clientRenderScript1Partial);
              }
              if (boundaryID === null) {
                throw new Error("An ID must have been assigned before we can complete the boundary.");
              }
              writeChunk(destination, boundaryID);
              writeChunk(destination, clientRenderScript1A);
              if (errorDigest || errorMessage || errorComponentStack) {
                writeChunk(destination, clientRenderErrorScriptArgInterstitial);
                writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")));
              }
              if (errorMessage || errorComponentStack) {
                writeChunk(destination, clientRenderErrorScriptArgInterstitial);
                writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")));
              }
              if (errorComponentStack) {
                writeChunk(destination, clientRenderErrorScriptArgInterstitial);
                writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)));
              }
              return writeChunkAndReturn(destination, clientRenderScript2);
            }