function popAssignScope(context) {
        context.scopeChain = context.scopeChain.previous;
    }