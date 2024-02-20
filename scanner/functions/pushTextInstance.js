function pushTextInstance(target, text, responseState, textEmbedded) {
              if (text === "") {
                return textEmbedded;
              }
              if (textEmbedded) {
                target.push(textSeparator);
              }
              target.push(stringToChunk(encodeHTMLTextNode(text)));
              return true;
            }