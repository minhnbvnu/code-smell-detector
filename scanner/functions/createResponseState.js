function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
              var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
              var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
              var bootstrapChunks = [];
              if (bootstrapScriptContent !== void 0) {
                bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
              }
              if (bootstrapScripts !== void 0) {
                for (var i = 0; i < bootstrapScripts.length; i++) {
                  bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
                }
              }
              if (bootstrapModules !== void 0) {
                for (var _i = 0; _i < bootstrapModules.length; _i++) {
                  bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
                }
              }
              return {
                bootstrapChunks,
                startInlineScript: inlineScriptWithNonce,
                placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
                segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
                boundaryPrefix: idPrefix + "B:",
                idPrefix,
                nextSuspenseID: 0,
                sentCompleteSegmentFunction: false,
                sentCompleteBoundaryFunction: false,
                sentClientRenderFunction: false
              };
            }