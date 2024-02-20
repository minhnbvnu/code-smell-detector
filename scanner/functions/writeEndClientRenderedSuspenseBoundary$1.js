function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
              if (responseState.generateStaticMarkup) {
                return true;
              }
              return writeEndClientRenderedSuspenseBoundary(destination);
            }