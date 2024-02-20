function preCollectImportTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        var typeSymbol = null;
        var modType = null;
        var importDecl = ast;
        var aliasedModSymbol = findSymbolFromAlias(importDecl.alias, {
            topLevelScope: scopeChain,
            members: null,
            tcContext: context
        });
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        if(aliasedModSymbol) {
            var aliasedModType = aliasedModSymbol.getType();
            if(aliasedModType) {
                modType = aliasedModType;
            }
        }
        typeSymbol = new TypeScript.TypeSymbol(importDecl.id.text, importDecl.id.minChar, importDecl.limChar - importDecl.minChar, context.checker.locationInfo.unitIndex, modType);
        typeSymbol.aliasLink = importDecl;
        if(context.scopeChain.moduleDecl) {
            typeSymbol.flags |= TypeScript.SymbolFlags.ModuleMember;
            typeSymbol.declModule = context.scopeChain.moduleDecl;
        }
        typeSymbol.declAST = importDecl;
        importDecl.id.sym = typeSymbol;
        scopeChain.scope.enter(scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isGlobal, true, false);
        scopeChain.scope.enter(scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isGlobal, false, false);
        return true;
    }