function checkForDanglingUnderscoreInVariableExpression(node) {
                context.getDeclaredVariables(node).forEach(variable => {
                    const definition = variable.defs.find(def => def.node === node);
                    const identifierNode = definition.name;
                    const identifier = identifierNode.name;
                    let parent = identifierNode.parent;
                    while (!["VariableDeclarator", "ArrayPattern", "ObjectPattern"].includes(parent.type)) {
                        parent = parent.parent;
                    }
                    if (hasDanglingUnderscore(identifier) &&
                        !isSpecialCaseIdentifierInVariableExpression(identifier) &&
                        !isAllowed(identifier) &&
                        !(allowInArrayDestructuring && parent.type === "ArrayPattern") &&
                        !(allowInObjectDestructuring && parent.type === "ObjectPattern")) {
                        context.report({
                            node,
                            messageId: "unexpectedUnderscore",
                            data: {
                                identifier
                            }
                        });
                    }
                });
            }