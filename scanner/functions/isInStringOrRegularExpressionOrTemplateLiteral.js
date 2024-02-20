function isInStringOrRegularExpressionOrTemplateLiteral(contextToken2) {
                return (isRegularExpressionLiteral(contextToken2) || isStringTextContainingNode(contextToken2)) && (rangeContainsPositionExclusive(contextToken2, position) || position === contextToken2.end && (!!contextToken2.isUnterminated || isRegularExpressionLiteral(contextToken2)));
            }