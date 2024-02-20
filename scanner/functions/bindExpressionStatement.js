function bindExpressionStatement(node) {
                bind(node.expression);
                maybeBindExpressionFlowIfCall(node.expression);
            }