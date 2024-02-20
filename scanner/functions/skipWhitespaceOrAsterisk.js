function skipWhitespaceOrAsterisk() {
                                if (token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */) {
                                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                                        return "";
                                    }
                                }
                                let precedingLineBreak = scanner2.hasPrecedingLineBreak();
                                let seenLineBreak = false;
                                let indentText = "";
                                while (precedingLineBreak && token() === 41 /* AsteriskToken */ || token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */) {
                                    indentText += scanner2.getTokenText();
                                    if (token() === 4 /* NewLineTrivia */) {
                                        precedingLineBreak = true;
                                        seenLineBreak = true;
                                        indentText = "";
                                    }
                                    else if (token() === 41 /* AsteriskToken */) {
                                        precedingLineBreak = false;
                                    }
                                    nextTokenJSDoc();
                                }
                                return seenLineBreak ? indentText : "";
                            }