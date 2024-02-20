function pushTextInstance$1(target, text, responseState, textEmbedded) {
              if (responseState.generateStaticMarkup) {
                target.push(stringToChunk(escapeTextForBrowser(text)));
                return false;
              } else {
                return pushTextInstance(target, text, responseState, textEmbedded);
              }
            }