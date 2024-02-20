function preFindMemberScope(ast, parent, walker) {
        var memScope = walker.state;
        if(TypeScript.hasFlag(ast.flags, memScope.matchFlag) && ((memScope.pos < 0) || (memScope.pos == ast.limChar))) {
            memScope.ast = ast;
            if((ast.type == null) && (memScope.pos >= 0)) {
                memScope.flow.inScopeTypeCheck(ast, memScope.scope);
            }
            memScope.type = ast.type;
            memScope.options.stopWalk();
        }
        return ast;
    }