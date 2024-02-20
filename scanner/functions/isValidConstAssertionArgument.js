function isValidConstAssertionArgument(node) {
                switch (node.kind) {
                    case 10 /* StringLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 8 /* NumericLiteral */:
                    case 9 /* BigIntLiteral */:
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                    case 206 /* ArrayLiteralExpression */:
                    case 207 /* ObjectLiteralExpression */:
                    case 225 /* TemplateExpression */:
                        return true;
                    case 214 /* ParenthesizedExpression */:
                        return isValidConstAssertionArgument(node.expression);
                    case 221 /* PrefixUnaryExpression */:
                        const op = node.operator;
                        const arg = node.operand;
                        return op === 40 /* MinusToken */ && (arg.kind === 8 /* NumericLiteral */ || arg.kind === 9 /* BigIntLiteral */) || op === 39 /* PlusToken */ && arg.kind === 8 /* NumericLiteral */;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const expr = skipParentheses(node.expression);
                        const symbol = isEntityNameExpression(expr) ? resolveEntityName(expr, 111551 /* Value */, 
                        /*ignoreErrors*/
                        true) : void 0;
                        return !!(symbol && symbol.flags & 384 /* Enum */);
                }
                return false;
            }