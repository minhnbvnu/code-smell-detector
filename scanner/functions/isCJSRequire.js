function isCJSRequire(node) {
        if (node.type === utils_1.AST_NODE_TYPES.VariableDeclaration) {
            const declaration = node.declarations[0];
            if (declaration === null || declaration === void 0 ? void 0 : declaration.init) {
                let call = declaration === null || declaration === void 0 ? void 0 : declaration.init;
                while (call.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                    call = call.object;
                }
                if (call.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    call.callee.type === utils_1.AST_NODE_TYPES.Identifier) {
                    return call.callee.name === 'require';
                }
            }
        }
        return false;
    }