function isBindingIdentifierOrPrivateIdentifierOrPattern() {
                        return token() === 18 /* OpenBraceToken */ || token() === 22 /* OpenBracketToken */ || token() === 80 /* PrivateIdentifier */ || isBindingIdentifier();
                    }