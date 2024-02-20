function isValidSpacing(left, right, expected) {
                return (astUtils.isClosingBraceToken(right) ||
                    !astUtils.isTokenOnSameLine(left, right) ||
                    sourceCode.isSpaceBetweenTokens(left, right) === expected);
            }