function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
              if (responseState.generateStaticMarkup) {
                return true;
              }
              return writeEndCompletedSuspenseBoundary(destination);
            }