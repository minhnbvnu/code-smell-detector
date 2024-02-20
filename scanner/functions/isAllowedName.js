function isAllowedName(node) {
                var _a;
                if (!node || !options.allowedNames || !options.allowedNames.length) {
                    return false;
                }
                if (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator ||
                    node.type === utils_1.AST_NODE_TYPES.FunctionDeclaration) {
                    return (((_a = node.id) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Identifier &&
                        options.allowedNames.includes(node.id.name));
                }
                else if (node.type === utils_1.AST_NODE_TYPES.MethodDefinition ||
                    node.type === utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition ||
                    (node.type === utils_1.AST_NODE_TYPES.Property && node.method) ||
                    node.type === utils_1.AST_NODE_TYPES.PropertyDefinition) {
                    if (node.key.type === utils_1.AST_NODE_TYPES.Literal &&
                        typeof node.key.value === 'string') {
                        return options.allowedNames.includes(node.key.value);
                    }
                    if (node.key.type === utils_1.AST_NODE_TYPES.TemplateLiteral &&
                        node.key.expressions.length === 0) {
                        return options.allowedNames.includes(node.key.quasis[0].value.raw);
                    }
                    if (!node.computed && node.key.type === utils_1.AST_NODE_TYPES.Identifier) {
                        return options.allowedNames.includes(node.key.name);
                    }
                }
                return false;
            }