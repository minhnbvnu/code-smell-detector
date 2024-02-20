function isLengthExpression(node, expectedObjectNode) {
                if (node.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                    return ((0, util_1.getPropertyName)(node, globalScope) === 'length' &&
                        isSameTokens(node.object, expectedObjectNode));
                }
                const evaluatedLength = (0, util_1.getStaticValue)(node, globalScope);
                const evaluatedString = (0, util_1.getStaticValue)(expectedObjectNode, globalScope);
                return (evaluatedLength != null &&
                    evaluatedString != null &&
                    typeof evaluatedLength.value === 'number' &&
                    typeof evaluatedString.value === 'string' &&
                    evaluatedLength.value === evaluatedString.value.length);
            }