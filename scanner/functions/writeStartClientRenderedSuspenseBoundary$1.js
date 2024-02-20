function writeStartClientRenderedSuspenseBoundary$1(destination, responseState, errorDigest, errorMessage, errorComponentStack) {
              if (responseState.generateStaticMarkup) {
                return true;
              }
              return writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMessage, errorComponentStack);
            }