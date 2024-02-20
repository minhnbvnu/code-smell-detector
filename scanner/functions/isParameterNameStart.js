function isParameterNameStart() {
                        return isBindingIdentifier() || token() === 22 /* OpenBracketToken */ || token() === 18 /* OpenBraceToken */;
                    }