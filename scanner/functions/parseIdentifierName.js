function parseIdentifierName(diagnosticMessage) {
                        return createIdentifier(tokenIsIdentifierOrKeyword(token()), diagnosticMessage);
                    }