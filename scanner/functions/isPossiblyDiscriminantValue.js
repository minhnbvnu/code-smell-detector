function isPossiblyDiscriminantValue(node) {
                switch (node.kind) {
                    case 10 /* StringLiteral */:
                    case 8 /* NumericLiteral */:
                    case 9 /* BigIntLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                    case 104 /* NullKeyword */:
                    case 79 /* Identifier */:
                    case 155 /* UndefinedKeyword */:
                        return true;
                    case 208 /* PropertyAccessExpression */:
                    case 214 /* ParenthesizedExpression */:
                        return isPossiblyDiscriminantValue(node.expression);
                    case 291 /* JsxExpression */:
                        return !node.expression || isPossiblyDiscriminantValue(node.expression);
                }
                return false;
            }