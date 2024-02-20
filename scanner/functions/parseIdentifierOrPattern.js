function parseIdentifierOrPattern(privateIdentifierDiagnosticMessage) {
                        if (token() === 22 /* OpenBracketToken */) {
                            return parseArrayBindingPattern();
                        }
                        if (token() === 18 /* OpenBraceToken */) {
                            return parseObjectBindingPattern();
                        }
                        return parseBindingIdentifier(privateIdentifierDiagnosticMessage);
                    }