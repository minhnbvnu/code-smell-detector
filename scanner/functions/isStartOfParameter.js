function isStartOfParameter(isJSDocParameter) {
                        return token() === 25 /* DotDotDotToken */ || isBindingIdentifierOrPrivateIdentifierOrPattern() || isModifierKind(token()) || token() === 59 /* AtToken */ || isStartOfType(
                        /*inStartOfParameter*/
                        !isJSDocParameter);
                    }