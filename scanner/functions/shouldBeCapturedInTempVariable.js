function shouldBeCapturedInTempVariable(node, cacheIdentifiers) {
                const target = skipParentheses(node);
                switch (target.kind) {
                    case 79 /* Identifier */:
                        return cacheIdentifiers;
                    case 108 /* ThisKeyword */:
                    case 8 /* NumericLiteral */:
                    case 9 /* BigIntLiteral */:
                    case 10 /* StringLiteral */:
                        return false;
                    case 206 /* ArrayLiteralExpression */:
                        const elements = target.elements;
                        if (elements.length === 0) {
                            return false;
                        }
                        return true;
                    case 207 /* ObjectLiteralExpression */:
                        return target.properties.length > 0;
                    default:
                        return true;
                }
            }