function isBindingIdentifier() {
                        if (token() === 79 /* Identifier */) {
                            return true;
                        }
                        return token() > 116 /* LastReservedWord */;
                    }