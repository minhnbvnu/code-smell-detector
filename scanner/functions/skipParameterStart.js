function skipParameterStart() {
                        if (isModifierKind(token())) {
                            parseModifiers(
                            /*allowDecorators*/
                            false);
                        }
                        if (isIdentifier2() || token() === 108 /* ThisKeyword */) {
                            nextToken();
                            return true;
                        }
                        if (token() === 22 /* OpenBracketToken */ || token() === 18 /* OpenBraceToken */) {
                            const previousErrorCount = parseDiagnostics.length;
                            parseIdentifierOrPattern();
                            return previousErrorCount === parseDiagnostics.length;
                        }
                        return false;
                    }