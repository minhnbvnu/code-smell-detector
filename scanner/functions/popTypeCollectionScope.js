function popTypeCollectionScope(context) {
        context.scopeChain = context.scopeChain.previous;
    }