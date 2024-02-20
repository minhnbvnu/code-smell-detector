function isNextNonwhitespaceTokenEndOfFile() {
                                while (true) {
                                    nextTokenJSDoc();
                                    if (token() === 1 /* EndOfFileToken */) {
                                        return true;
                                    }
                                    if (!(token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */)) {
                                        return false;
                                    }
                                }
                            }