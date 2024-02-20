function isAllowedFunction(node) {
                var _a, _b;
                if (options.allowFunctionsWithoutTypeParameters && !node.typeParameters) {
                    return true;
                }
                if (options.allowIIFEs && isIIFE(node)) {
                    return true;
                }
                if (!((_a = options.allowedNames) === null || _a === void 0 ? void 0 : _a.length)) {
                    return false;
                }
                if (node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                    node.type === utils_1.AST_NODE_TYPES.FunctionExpression) {
                    const parent = node.parent;
                    let funcName;
                    if ((_b = node.id) === null || _b === void 0 ? void 0 : _b.name) {
                        funcName = node.id.name;
                    }
                    else if (parent) {
                        switch (parent.type) {
                            case utils_1.AST_NODE_TYPES.VariableDeclarator: {
                                if (parent.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                                    funcName = parent.id.name;
                                }
                                break;
                            }
                            case utils_1.AST_NODE_TYPES.MethodDefinition:
                            case utils_1.AST_NODE_TYPES.PropertyDefinition:
                            case utils_1.AST_NODE_TYPES.Property: {
                                if (parent.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                                    parent.computed === false) {
                                    funcName = parent.key.name;
                                }
                                break;
                            }
                        }
                    }
                    if (!!funcName && !!options.allowedNames.includes(funcName)) {
                        return true;
                    }
                }
                if (node.type === utils_1.AST_NODE_TYPES.FunctionDeclaration &&
                    node.id &&
                    node.id.type === utils_1.AST_NODE_TYPES.Identifier &&
                    !!options.allowedNames.includes(node.id.name)) {
                    return true;
                }
                return false;
            }