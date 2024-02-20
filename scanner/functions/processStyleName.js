function processStyleName(styleName) {
              var chunk = styleNameCache.get(styleName);
              if (chunk !== void 0) {
                return chunk;
              }
              var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
              styleNameCache.set(styleName, result);
              return result;
            }