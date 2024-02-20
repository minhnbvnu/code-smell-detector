function substituteConstantValue(node) {
                const constantValue = tryGetConstEnumValue(node);
                if (constantValue !== void 0) {
                    setConstantValue(node, constantValue);
                    const substitute = typeof constantValue === "string" ? factory2.createStringLiteral(constantValue) : factory2.createNumericLiteral(constantValue);
                    if (!compilerOptions.removeComments) {
                        const originalNode = getOriginalNode(node, isAccessExpression);
                        addSyntheticTrailingComment(substitute, 3 /* MultiLineCommentTrivia */, ` ${safeMultiLineComment(getTextOfNode(originalNode))} `);
                    }
                    return substitute;
                }
                return node;
            }