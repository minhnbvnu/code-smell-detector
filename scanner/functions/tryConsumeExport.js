function tryConsumeExport() {
                let token = scanner.getToken();
                if (token === 93 /* ExportKeyword */) {
                    markAsExternalModuleIfTopLevel();
                    token = nextToken();
                    if (token === 154 /* TypeKeyword */) {
                        const skipTypeKeyword = scanner.lookAhead(() => {
                            const token2 = scanner.scan();
                            return token2 === 41 /* AsteriskToken */ || token2 === 18 /* OpenBraceToken */;
                        });
                        if (skipTypeKeyword) {
                            token = nextToken();
                        }
                    }
                    if (token === 18 /* OpenBraceToken */) {
                        token = nextToken();
                        while (token !== 19 /* CloseBraceToken */ && token !== 1 /* EndOfFileToken */) {
                            token = nextToken();
                        }
                        if (token === 19 /* CloseBraceToken */) {
                            token = nextToken();
                            if (token === 158 /* FromKeyword */) {
                                token = nextToken();
                                if (token === 10 /* StringLiteral */) {
                                    recordModuleName();
                                }
                            }
                        }
                    }
                    else if (token === 41 /* AsteriskToken */) {
                        token = nextToken();
                        if (token === 158 /* FromKeyword */) {
                            token = nextToken();
                            if (token === 10 /* StringLiteral */) {
                                recordModuleName();
                            }
                        }
                    }
                    else if (token === 100 /* ImportKeyword */) {
                        token = nextToken();
                        if (token === 154 /* TypeKeyword */) {
                            const skipTypeKeyword = scanner.lookAhead(() => {
                                const token2 = scanner.scan();
                                return token2 === 79 /* Identifier */ || isKeyword(token2);
                            });
                            if (skipTypeKeyword) {
                                token = nextToken();
                            }
                        }
                        if (token === 79 /* Identifier */ || isKeyword(token)) {
                            token = nextToken();
                            if (token === 63 /* EqualsToken */) {
                                if (tryConsumeRequireCall(
                                /*skipCurrentToken*/
                                true)) {
                                    return true;
                                }
                            }
                        }
                    }
                    return true;
                }
                return false;
            }