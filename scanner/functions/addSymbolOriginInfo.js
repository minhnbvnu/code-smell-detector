function addSymbolOriginInfo(symbol2) {
                    if (preferences.includeCompletionsWithInsertText) {
                        if (insertAwait && addToSeen(seenPropertySymbols, getSymbolId(symbol2))) {
                            symbolToOriginInfoMap[symbols.length] = { kind: getNullableSymbolOriginInfoKind(8 /* Promise */) };
                        }
                        else if (insertQuestionDot) {
                            symbolToOriginInfoMap[symbols.length] = { kind: 16 /* Nullable */ };
                        }
                    }
                }