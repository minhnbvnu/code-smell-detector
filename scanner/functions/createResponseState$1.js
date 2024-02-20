function createResponseState$1(generateStaticMarkup, identifierPrefix) {
              var responseState = createResponseState(identifierPrefix, void 0);
              return {
                // Keep this in sync with ReactDOMServerFormatConfig
                bootstrapChunks: responseState.bootstrapChunks,
                startInlineScript: responseState.startInlineScript,
                placeholderPrefix: responseState.placeholderPrefix,
                segmentPrefix: responseState.segmentPrefix,
                boundaryPrefix: responseState.boundaryPrefix,
                idPrefix: responseState.idPrefix,
                nextSuspenseID: responseState.nextSuspenseID,
                sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
                sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
                sentClientRenderFunction: responseState.sentClientRenderFunction,
                // This is an extra field for the legacy renderer
                generateStaticMarkup
              };
            }