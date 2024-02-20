function checkForDanglingUnderscoreInFunctionParameters(node) {
                if (!allowFunctionParams) {
                    node.params.forEach(param => {
                        const { type } = param;
                        let nodeToCheck;
                        if (type === "RestElement") {
                            nodeToCheck = param.argument;
                        }
                        else if (type === "AssignmentPattern") {
                            nodeToCheck = param.left;
                        }
                        else {
                            nodeToCheck = param;
                        }
                        if (nodeToCheck.type === "Identifier") {
                            const identifier = nodeToCheck.name;
                            if (hasDanglingUnderscore(identifier) && !isAllowed(identifier)) {
                                context.report({
                                    node: param,
                                    messageId: "unexpectedUnderscore",
                                    data: {
                                        identifier
                                    }
                                });
                            }
                        }
                    });
                }
            }