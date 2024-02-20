function parseDelimitedList(kind, parseElement, considerSemicolonAsDelimiter) {
                        const saveParsingContext = parsingContext;
                        parsingContext |= 1 << kind;
                        const list = [];
                        const listPos = getNodePos();
                        let commaStart = -1;
                        while (true) {
                            if (isListElement2(kind, 
                            /*inErrorRecovery*/
                            false)) {
                                const startPos = scanner2.getStartPos();
                                const result = parseListElement(kind, parseElement);
                                if (!result) {
                                    parsingContext = saveParsingContext;
                                    return void 0;
                                }
                                list.push(result);
                                commaStart = scanner2.getTokenPos();
                                if (parseOptional(27 /* CommaToken */)) {
                                    continue;
                                }
                                commaStart = -1;
                                if (isListTerminator(kind)) {
                                    break;
                                }
                                parseExpected(27 /* CommaToken */, getExpectedCommaDiagnostic(kind));
                                if (considerSemicolonAsDelimiter && token() === 26 /* SemicolonToken */ && !scanner2.hasPrecedingLineBreak()) {
                                    nextToken();
                                }
                                if (startPos === scanner2.getStartPos()) {
                                    nextToken();
                                }
                                continue;
                            }
                            if (isListTerminator(kind)) {
                                break;
                            }
                            if (abortParsingListOrMoveToNextToken(kind)) {
                                break;
                            }
                        }
                        parsingContext = saveParsingContext;
                        return createNodeArray(list, listPos, 
                        /*end*/
                        void 0, commaStart >= 0);
                    }