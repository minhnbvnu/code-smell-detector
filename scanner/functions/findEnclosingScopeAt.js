function findEnclosingScopeAt(logger, script, text, pos, isMemberCompletion) {
        var context = new EnclosingScopeContext(logger, script, text, pos, isMemberCompletion);
        TypeScript.getAstWalkerFactory().walk(script, preFindEnclosingScope, null, null, context);
        if(context.scopeStartAST === null) {
            return null;
        }
        return context;
    }