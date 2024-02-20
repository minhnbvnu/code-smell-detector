function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
              var result;
              result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
              writeChunk(destination, clientRenderedSuspenseBoundaryError1);
              if (errorDigest) {
                writeChunk(destination, clientRenderedSuspenseBoundaryError1A);
                writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest)));
                writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
              }
              {
                if (errorMesssage) {
                  writeChunk(destination, clientRenderedSuspenseBoundaryError1B);
                  writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage)));
                  writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
                }
                if (errorComponentStack) {
                  writeChunk(destination, clientRenderedSuspenseBoundaryError1C);
                  writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack)));
                  writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
                }
              }
              result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2);
              return result;
            }