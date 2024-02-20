function checkForDanglingUnderscoreInMemberExpression(node) {
                const identifier = node.property.name, isMemberOfThis = node.object.type === "ThisExpression", isMemberOfSuper = node.object.type === "Super", isMemberOfThisConstructor = isThisConstructorReference(node);
                if (typeof identifier !== "undefined" && hasDanglingUnderscore(identifier) &&
                    !(isMemberOfThis && allowAfterThis) &&
                    !(isMemberOfSuper && allowAfterSuper) &&
                    !(isMemberOfThisConstructor && allowAfterThisConstructor) &&
                    !isSpecialCaseIdentifierForMemberExpression(identifier) && !isAllowed(identifier)) {
                    context.report({
                        node,
                        messageId: "unexpectedUnderscore",
                        data: {
                            identifier
                        }
                    });
                }
            }