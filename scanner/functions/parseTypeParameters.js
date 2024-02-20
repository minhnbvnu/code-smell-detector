function parseTypeParameters() {
                        if (token() === 29 /* LessThanToken */) {
                            return parseBracketedList(19 /* TypeParameters */, parseTypeParameter, 29 /* LessThanToken */, 31 /* GreaterThanToken */);
                        }
                    }