function checkForDanglingUnderscoreInFunction(node) {
                if (node.type === "FunctionDeclaration" && node.id) {
                    const identifier = node.id.name;
                    if (typeof identifier !== "undefined" && hasDanglingUnderscore(identifier) && !isAllowed(identifier)) {
                        context.report({
                            node,
                            messageId: "unexpectedUnderscore",
                            data: {
                                identifier
                            }
                        });
                    }
                }
                checkForDanglingUnderscoreInFunctionParameters(node);
            }