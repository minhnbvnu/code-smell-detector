function checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks) {
                        const oldText = sourceFile.text;
                        if (textChangeRange) {
                            Debug.assert(oldText.length - textChangeRange.span.length + textChangeRange.newLength === newText.length);
                            if (aggressiveChecks || Debug.shouldAssert(3 /* VeryAggressive */)) {
                                const oldTextPrefix = oldText.substr(0, textChangeRange.span.start);
                                const newTextPrefix = newText.substr(0, textChangeRange.span.start);
                                Debug.assert(oldTextPrefix === newTextPrefix);
                                const oldTextSuffix = oldText.substring(textSpanEnd(textChangeRange.span), oldText.length);
                                const newTextSuffix = newText.substring(textSpanEnd(textChangeRangeNewSpan(textChangeRange)), newText.length);
                                Debug.assert(oldTextSuffix === newTextSuffix);
                            }
                        }
                    }