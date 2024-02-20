function parseExpectedToken(t, diagnosticMessage, arg0) {
                        return parseOptionalToken(t) || createMissingNode(t, 
                        /*reportAtCurrentPosition*/
                        false, diagnosticMessage || Diagnostics._0_expected, arg0 || tokenToString(t));
                    }