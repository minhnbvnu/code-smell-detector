function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
              if (responseState.generateStaticMarkup) {
                return true;
              }
              return writeStartCompletedSuspenseBoundary(destination);
            }