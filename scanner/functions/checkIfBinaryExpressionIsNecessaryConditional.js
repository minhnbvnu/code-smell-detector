function checkIfBinaryExpressionIsNecessaryConditional(node) {
                if (!BOOL_OPERATORS.has(node.operator)) {
                    return;
                }
                const leftType = getNodeType(node.left);
                const rightType = getNodeType(node.right);
                if (isLiteral(leftType) && isLiteral(rightType)) {
                    context.report({ node, messageId: 'literalBooleanExpression' });
                    return;
                }
                // Workaround for https://github.com/microsoft/TypeScript/issues/37160
                if (isStrictNullChecks) {
                    const UNDEFINED = ts.TypeFlags.Undefined;
                    const NULL = ts.TypeFlags.Null;
                    const VOID = ts.TypeFlags.Void;
                    const isComparable = (type, flag) => {
                        // Allow comparison to `any`, `unknown` or a naked type parameter.
                        flag |=
                            ts.TypeFlags.Any |
                                ts.TypeFlags.Unknown |
                                ts.TypeFlags.TypeParameter;
                        // Allow loose comparison to nullish values.
                        if (node.operator === '==' || node.operator === '!=') {
                            flag |= NULL | UNDEFINED | VOID;
                        }
                        return (0, util_1.isTypeFlagSet)(type, flag);
                    };
                    if ((leftType.flags === UNDEFINED &&
                        !isComparable(rightType, UNDEFINED | VOID)) ||
                        (rightType.flags === UNDEFINED &&
                            !isComparable(leftType, UNDEFINED | VOID)) ||
                        (leftType.flags === NULL && !isComparable(rightType, NULL)) ||
                        (rightType.flags === NULL && !isComparable(leftType, NULL))) {
                        context.report({ node, messageId: 'noOverlapBooleanExpression' });
                        return;
                    }
                }
            }