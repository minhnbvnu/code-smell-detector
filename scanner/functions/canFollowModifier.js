function canFollowModifier() {
                        return token() === 22 /* OpenBracketToken */ || token() === 18 /* OpenBraceToken */ || token() === 41 /* AsteriskToken */ || token() === 25 /* DotDotDotToken */ || isLiteralPropertyName();
                    }