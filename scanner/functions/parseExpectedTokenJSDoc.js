function parseExpectedTokenJSDoc(t) {
                        return parseOptionalTokenJSDoc(t) || createMissingNode(t, 
                        /*reportAtCurrentPosition*/
                        false, Diagnostics._0_expected, tokenToString(t));
                    }