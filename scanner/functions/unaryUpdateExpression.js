function unaryUpdateExpression(node) {
                const rule = rules.UnaryExpression;
                if (util.isTypeAssertion(node.argument)) {
                    // reduces the precedence of the node so the rule thinks it needs to be wrapped
                    return rule(Object.assign(Object.assign({}, node), { argument: Object.assign(Object.assign({}, node.argument), { type: utils_1.AST_NODE_TYPES.SequenceExpression }) }));
                }
                return rule(node);
            }