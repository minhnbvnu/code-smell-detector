function isIdentifier2() {
                        if (token() === 79 /* Identifier */) {
                            return true;
                        }
                        if (token() === 125 /* YieldKeyword */ && inYieldContext()) {
                            return false;
                        }
                        if (token() === 133 /* AwaitKeyword */ && inAwaitContext()) {
                            return false;
                        }
                        return token() > 116 /* LastReservedWord */;
                    }