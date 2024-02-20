function callLikeExpressionMayHaveTypeArguments(node) {
                return isCallOrNewExpression(node) || isTaggedTemplateExpression(node) || isJsxOpeningLikeElement(node);
            }