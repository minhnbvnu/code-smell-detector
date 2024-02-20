function serializeLiteralOfLiteralTypeNode(node) {
                switch (node.kind) {
                    case 10 /* StringLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        return factory.createIdentifier("String");
                    case 221 /* PrefixUnaryExpression */: {
                        const operand = node.operand;
                        switch (operand.kind) {
                            case 8 /* NumericLiteral */:
                            case 9 /* BigIntLiteral */:
                                return serializeLiteralOfLiteralTypeNode(operand);
                            default:
                                return Debug.failBadSyntaxKind(operand);
                        }
                    }
                    case 8 /* NumericLiteral */:
                        return factory.createIdentifier("Number");
                    case 9 /* BigIntLiteral */:
                        return getGlobalConstructor("BigInt", 7 /* ES2020 */);
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                        return factory.createIdentifier("Boolean");
                    case 104 /* NullKeyword */:
                        return factory.createVoidZero();
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }