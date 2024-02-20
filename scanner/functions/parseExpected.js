function parseExpected(kind, diagnosticMessage, shouldAdvance = true) {
                        if (token() === kind) {
                            if (shouldAdvance) {
                                nextToken();
                            }
                            return true;
                        }
                        if (diagnosticMessage) {
                            parseErrorAtCurrentToken(diagnosticMessage);
                        }
                        else {
                            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
                        }
                        return false;
                    }