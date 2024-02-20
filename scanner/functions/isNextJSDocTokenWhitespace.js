function isNextJSDocTokenWhitespace() {
                                const next = nextTokenJSDoc();
                                return next === 5 /* WhitespaceTrivia */ || next === 4 /* NewLineTrivia */;
                            }