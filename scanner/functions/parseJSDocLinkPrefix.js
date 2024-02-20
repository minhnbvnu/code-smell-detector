function parseJSDocLinkPrefix() {
                                skipWhitespaceOrAsterisk();
                                if (token() === 18 /* OpenBraceToken */ && nextTokenJSDoc() === 59 /* AtToken */ && tokenIsIdentifierOrKeyword(nextTokenJSDoc())) {
                                    const kind = scanner2.getTokenValue();
                                    if (isJSDocLinkTag(kind))
                                        return kind;
                                }
                            }