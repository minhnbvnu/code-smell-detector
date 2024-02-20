function getEnclosingDeclarationFromInvocation(invocation) {
            return invocation.kind === 0 /* Call */ ? invocation.node : invocation.kind === 1 /* TypeArgs */ ? invocation.called : invocation.node;
        }