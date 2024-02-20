function isInSomeParsingContext() {
                        for (let kind = 0; kind < 25 /* Count */; kind++) {
                            if (parsingContext & 1 << kind) {
                                if (isListElement2(kind, 
                                /*inErrorRecovery*/
                                true) || isListTerminator(kind)) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }