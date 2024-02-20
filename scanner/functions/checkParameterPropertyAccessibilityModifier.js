function checkParameterPropertyAccessibilityModifier(node) {
                const nodeType = 'parameter property';
                // HAS to be an identifier or assignment or TSC will throw
                if (node.parameter.type !== utils_1.AST_NODE_TYPES.Identifier &&
                    node.parameter.type !== utils_1.AST_NODE_TYPES.AssignmentPattern) {
                    return;
                }
                const nodeName = node.parameter.type === utils_1.AST_NODE_TYPES.Identifier
                    ? node.parameter.name
                    : // has to be an Identifier or TSC will throw an error
                        node.parameter.left.name;
                switch (paramPropCheck) {
                    case 'explicit': {
                        if (!node.accessibility) {
                            context.report({
                                node,
                                messageId: 'missingAccessibility',
                                data: {
                                    type: nodeType,
                                    name: nodeName,
                                },
                                suggest: getMissingAccessibilitySuggestions(node),
                            });
                        }
                        break;
                    }
                    case 'no-public': {
                        if (node.accessibility === 'public' && node.readonly) {
                            context.report({
                                node,
                                messageId: 'unwantedPublicAccessibility',
                                data: {
                                    type: nodeType,
                                    name: nodeName,
                                },
                                fix: getUnwantedPublicAccessibilityFixer(node),
                            });
                        }
                        break;
                    }
                }
            }