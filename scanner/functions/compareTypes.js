function compareTypes(valueNode, typeNode, canFix) {
                if (valueNode.type === utils_1.AST_NODE_TYPES.Literal &&
                    typeNode.type === utils_1.AST_NODE_TYPES.TSLiteralType &&
                    'raw' in typeNode.literal &&
                    valueNode.raw === typeNode.literal.raw) {
                    if (canFix) {
                        context.report({
                            node: typeNode,
                            messageId: 'preferConstAssertion',
                            fix: fixer => fixer.replaceText(typeNode, 'const'),
                        });
                    }
                    else {
                        context.report({
                            node: typeNode,
                            messageId: 'variableConstAssertion',
                            suggest: [
                                {
                                    messageId: 'variableSuggest',
                                    fix: (fixer) => [
                                        fixer.remove(typeNode.parent),
                                        fixer.insertTextAfter(valueNode, ' as const'),
                                    ],
                                },
                            ],
                        });
                    }
                }
            }