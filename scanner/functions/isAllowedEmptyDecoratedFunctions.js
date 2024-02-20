function isAllowedEmptyDecoratedFunctions(node) {
                var _a;
                if (isAllowedDecoratedFunctions && isBodyEmpty(node)) {
                    const decorators = ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.MethodDefinition
                        ? node.parent.decorators
                        : undefined;
                    return !!decorators && !!decorators.length;
                }
                return false;
            }