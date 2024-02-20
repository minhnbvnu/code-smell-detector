function startChunkForTag(tag) {
              var tagStartChunk = validatedTagCache.get(tag);
              if (tagStartChunk === void 0) {
                if (!VALID_TAG_REGEX.test(tag)) {
                  throw new Error("Invalid tag: " + tag);
                }
                tagStartChunk = stringToPrecomputedChunk("<" + tag);
                validatedTagCache.set(tag, tagStartChunk);
              }
              return tagStartChunk;
            }