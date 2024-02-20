function isOuterExpression(node, kinds = 15 /* All */) {
            switch (node.kind) {
                case 214 /* ParenthesizedExpression */:
                    if (kinds & 16 /* ExcludeJSDocTypeAssertion */ && isJSDocTypeAssertion(node)) {
                        return false;
                    }
                    return (kinds & 1 /* Parentheses */) !== 0;
                case 213 /* TypeAssertionExpression */:
                case 231 /* AsExpression */:
                case 230 /* ExpressionWithTypeArguments */:
                case 235 /* SatisfiesExpression */:
                    return (kinds & 2 /* TypeAssertions */) !== 0;
                case 232 /* NonNullExpression */:
                    return (kinds & 4 /* NonNullAssertions */) !== 0;
                case 356 /* PartiallyEmittedExpression */:
                    return (kinds & 8 /* PartiallyEmittedExpressions */) !== 0;
            }
            return false;
        }