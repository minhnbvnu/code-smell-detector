function callExp(node) {
                var _a;
                const rule = rules.CallExpression;
                if (util.isTypeAssertion(node.callee)) {
                    // reduces the precedence of the node so the rule thinks it needs to be wrapped
                    return rule(Object.assign(Object.assign({}, node), { callee: Object.assign(Object.assign({}, node.callee), { type: utils_1.AST_NODE_TYPES.SequenceExpression }) }));
                }
                if (node.arguments.length === 1 &&
                    ((_a = node.typeParameters) === null || _a === void 0 ? void 0 : _a.params.some(param => param.type === utils_1.AST_NODE_TYPES.TSImportType ||
                        param.type === utils_1.AST_NODE_TYPES.TSArrayType))) {
                    return rule(Object.assign(Object.assign({}, node), { arguments: [
                            Object.assign(Object.assign({}, node.arguments[0]), { type: utils_1.AST_NODE_TYPES.SequenceExpression }),
                        ] }));
                }
                return rule(node);
            }