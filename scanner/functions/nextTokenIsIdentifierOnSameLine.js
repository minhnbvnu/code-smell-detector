function nextTokenIsIdentifierOnSameLine() {
                        nextToken();
                        return !scanner2.hasPrecedingLineBreak() && isIdentifier2();
                    }