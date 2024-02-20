function nextTokenIsBindingIdentifierOrStartOfDestructuring() {
                        nextToken();
                        return isBindingIdentifier() || token() === 18 /* OpenBraceToken */ || token() === 22 /* OpenBracketToken */;
                    }