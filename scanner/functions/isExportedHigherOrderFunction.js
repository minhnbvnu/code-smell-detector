function isExportedHigherOrderFunction(node) {
                var _a;
                let current = node.parent;
                while (current) {
                    if (current.type === utils_1.AST_NODE_TYPES.ReturnStatement) {
                        // the parent of a return will always be a block statement, so we can skip over it
                        current = (_a = current.parent) === null || _a === void 0 ? void 0 : _a.parent;
                        continue;
                    }
                    if (!util.isFunction(current) ||
                        !(0, explicitReturnTypeUtils_1.doesImmediatelyReturnFunctionExpression)(current)) {
                        return false;
                    }
                    if (checkedFunctions.has(current)) {
                        return true;
                    }
                    current = current.parent;
                }
                return false;
            }