function hasParameterProperties(node) {
                var _a;
                return (_a = node.params) === null || _a === void 0 ? void 0 : _a.some(param => param.type === utils_1.AST_NODE_TYPES.TSParameterProperty);
            }