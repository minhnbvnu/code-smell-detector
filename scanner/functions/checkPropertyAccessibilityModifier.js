function checkPropertyAccessibilityModifier(propertyDefinition) {
                if (propertyDefinition.key.type === utils_1.AST_NODE_TYPES.PrivateIdentifier) {
                    return;
                }
                const nodeType = 'class property';
                const { name: propertyName } = util.getNameFromMember(propertyDefinition, sourceCode);
                if (propCheck === 'no-public' &&
                    propertyDefinition.accessibility === 'public') {
                    context.report({
                        node: propertyDefinition,
                        messageId: 'unwantedPublicAccessibility',
                        data: {
                            type: nodeType,
                            name: propertyName,
                        },
                        fix: getUnwantedPublicAccessibilityFixer(propertyDefinition),
                    });
                }
                else if (propCheck === 'explicit' &&
                    !propertyDefinition.accessibility) {
                    context.report({
                        node: propertyDefinition,
                        messageId: 'missingAccessibility',
                        data: {
                            type: nodeType,
                            name: propertyName,
                        },
                        suggest: getMissingAccessibilitySuggestions(propertyDefinition),
                    });
                }
            }