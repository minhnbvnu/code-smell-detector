function checkForDanglingUnderscoreInMethod(node) {
                const identifier = node.key.name;
                const isMethod = node.type === "MethodDefinition" || node.type === "Property" && node.method;
                if (typeof identifier !== "undefined" && enforceInMethodNames && isMethod && hasDanglingUnderscore(identifier) && !isAllowed(identifier)) {
                    context.report({
                        node,
                        messageId: "unexpectedUnderscore",
                        data: {
                            identifier: node.key.type === "PrivateIdentifier"
                                ? `#${identifier}`
                                : identifier
                        }
                    });
                }
            }