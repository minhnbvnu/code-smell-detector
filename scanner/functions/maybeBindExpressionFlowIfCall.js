function maybeBindExpressionFlowIfCall(node) {
                if (node.kind === 210 /* CallExpression */) {
                    const call = node;
                    if (call.expression.kind !== 106 /* SuperKeyword */ && isDottedName(call.expression)) {
                        currentFlow = createFlowCall(currentFlow, call);
                    }
                }
            }