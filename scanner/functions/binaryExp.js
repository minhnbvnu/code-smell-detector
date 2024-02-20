function binaryExp(node) {
                const rule = rules.BinaryExpression;
                // makes the rule think it should skip the left or right
                const isLeftTypeAssertion = util.isTypeAssertion(node.left);
                const isRightTypeAssertion = util.isTypeAssertion(node.right);
                if (isLeftTypeAssertion && isRightTypeAssertion) {
                    return; // ignore
                }
                if (isLeftTypeAssertion) {
                    return rule(Object.assign(Object.assign({}, node), { left: Object.assign(Object.assign({}, node.left), { type: utils_1.AST_NODE_TYPES.SequenceExpression }) }));
                }
                if (isRightTypeAssertion) {
                    return rule(Object.assign(Object.assign({}, node), { right: Object.assign(Object.assign({}, node.right), { type: utils_1.AST_NODE_TYPES.SequenceExpression }) }));
                }
                return rule(node);
            }