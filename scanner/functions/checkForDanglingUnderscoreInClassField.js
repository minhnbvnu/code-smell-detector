function checkForDanglingUnderscoreInClassField(node) {
                const identifier = node.key.name;
                if (typeof identifier !== "undefined" && hasDanglingUnderscore(identifier) &&
                    enforceInClassFields &&
                    !isAllowed(identifier)) {
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