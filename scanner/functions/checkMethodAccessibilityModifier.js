function checkMethodAccessibilityModifier(methodDefinition) {
                if (methodDefinition.key.type === utils_1.AST_NODE_TYPES.PrivateIdentifier) {
                    return;
                }
                let nodeType = 'method definition';
                let check = baseCheck;
                switch (methodDefinition.kind) {
                    case 'method':
                        check = methodCheck;
                        break;
                    case 'constructor':
                        check = ctorCheck;
                        break;
                    case 'get':
                    case 'set':
                        check = accessorCheck;
                        nodeType = `${methodDefinition.kind} property accessor`;
                        break;
                }
                const { name: methodName } = util.getNameFromMember(methodDefinition, sourceCode);
                if (check === 'off' || ignoredMethodNames.has(methodName)) {
                    return;
                }
                if (check === 'no-public' &&
                    methodDefinition.accessibility === 'public') {
                    context.report({
                        node: methodDefinition,
                        messageId: 'unwantedPublicAccessibility',
                        data: {
                            type: nodeType,
                            name: methodName,
                        },
                        fix: getUnwantedPublicAccessibilityFixer(methodDefinition),
                    });
                }
                else if (check === 'explicit' && !methodDefinition.accessibility) {
                    context.report({
                        node: methodDefinition,
                        messageId: 'missingAccessibility',
                        data: {
                            type: nodeType,
                            name: methodName,
                        },
                        suggest: getMissingAccessibilitySuggestions(methodDefinition),
                    });
                }
            }