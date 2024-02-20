function checkParameter(param) {
                    function report(namedMessageId, unnamedMessageId) {
                        if (param.type === utils_1.AST_NODE_TYPES.Identifier) {
                            context.report({
                                node: param,
                                messageId: namedMessageId,
                                data: { name: param.name },
                            });
                        }
                        else if (param.type === utils_1.AST_NODE_TYPES.ArrayPattern) {
                            context.report({
                                node: param,
                                messageId: unnamedMessageId,
                                data: { type: 'Array pattern' },
                            });
                        }
                        else if (param.type === utils_1.AST_NODE_TYPES.ObjectPattern) {
                            context.report({
                                node: param,
                                messageId: unnamedMessageId,
                                data: { type: 'Object pattern' },
                            });
                        }
                        else if (param.type === utils_1.AST_NODE_TYPES.RestElement) {
                            if (param.argument.type === utils_1.AST_NODE_TYPES.Identifier) {
                                context.report({
                                    node: param,
                                    messageId: namedMessageId,
                                    data: { name: param.argument.name },
                                });
                            }
                            else {
                                context.report({
                                    node: param,
                                    messageId: unnamedMessageId,
                                    data: { type: 'Rest' },
                                });
                            }
                        }
                    }
                    switch (param.type) {
                        case utils_1.AST_NODE_TYPES.ArrayPattern:
                        case utils_1.AST_NODE_TYPES.Identifier:
                        case utils_1.AST_NODE_TYPES.ObjectPattern:
                        case utils_1.AST_NODE_TYPES.RestElement:
                            if (!param.typeAnnotation) {
                                report('missingArgType', 'missingArgTypeUnnamed');
                            }
                            else if (options.allowArgumentsExplicitlyTypedAsAny !== true &&
                                param.typeAnnotation.typeAnnotation.type ===
                                    utils_1.AST_NODE_TYPES.TSAnyKeyword) {
                                report('anyTypedArg', 'anyTypedArgUnnamed');
                            }
                            return;
                        case utils_1.AST_NODE_TYPES.TSParameterProperty:
                            return checkParameter(param.parameter);
                        case utils_1.AST_NODE_TYPES.AssignmentPattern: // ignored as it has a type via its assignment
                            return;
                    }
                }