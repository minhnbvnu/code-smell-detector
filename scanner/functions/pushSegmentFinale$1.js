function pushSegmentFinale$1(target, responseState, lastPushedText, textEmbedded) {
              if (responseState.generateStaticMarkup) {
                return;
              } else {
                return pushSegmentFinale(target, responseState, lastPushedText, textEmbedded);
              }
            }