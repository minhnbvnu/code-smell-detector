function nextTokenIsIdentifierOrStringLiteralOnSameLine() {
                        nextToken();
                        return !scanner2.hasPrecedingLineBreak() && (isIdentifier2() || token() === 10 /* StringLiteral */);
                    }