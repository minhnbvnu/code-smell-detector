function checkEmptyBodyFunctionExpression(node) {
                var _a, _b, _c;
                const isConstructor = ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.MethodDefinition &&
                    node.parent.kind === 'constructor';
                const isSetAccessor = (((_b = node.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition ||
                    ((_c = node.parent) === null || _c === void 0 ? void 0 : _c.type) === utils_1.AST_NODE_TYPES.MethodDefinition) &&
                    node.parent.kind === 'set';
                if (!isConstructor && !isSetAccessor && !node.returnType) {
                    context.report({
                        node,
                        messageId: 'missingReturnType',
                    });
                }
                checkParameters(node);
            }