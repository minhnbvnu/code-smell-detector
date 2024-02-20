function getExpressionFromInvocation(invocation) {
            return invocation.kind === 0 /* Call */ ? getInvokedExpression(invocation.node) : invocation.called;
        }