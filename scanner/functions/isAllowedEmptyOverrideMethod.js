function isAllowedEmptyOverrideMethod(node) {
                var _a;
                return (isAllowedOverrideMethods &&
                    isBodyEmpty(node) &&
                    ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.MethodDefinition &&
                    node.parent.override === true);
            }