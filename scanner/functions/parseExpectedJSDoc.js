function parseExpectedJSDoc(kind) {
                        if (token() === kind) {
                            nextTokenJSDoc();
                            return true;
                        }
                        parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
                        return false;
                    }