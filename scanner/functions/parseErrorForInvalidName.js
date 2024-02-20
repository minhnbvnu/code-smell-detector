function parseErrorForInvalidName(nameDiagnostic, blankDiagnostic, tokenIfBlankName) {
                        if (token() === tokenIfBlankName) {
                            parseErrorAtCurrentToken(blankDiagnostic);
                        }
                        else {
                            parseErrorAtCurrentToken(nameDiagnostic, scanner2.getTokenValue());
                        }
                    }