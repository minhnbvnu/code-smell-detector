function substituteCallExpression(node) {
                if (isIdentifier(node.expression)) {
                    const expression = substituteExpressionIdentifier(node.expression);
                    noSubstitution[getNodeId(expression)] = true;
                    if (!isIdentifier(expression) && !(getEmitFlags(node.expression) & 8192 /* HelperName */)) {
                        return addInternalEmitFlags(factory2.updateCallExpression(node, expression, 
                        /*typeArguments*/
                        void 0, node.arguments), 16 /* IndirectCall */);
                    }
                }
                return node;
            }