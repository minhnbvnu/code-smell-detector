function preCollectArgDeclTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        var argDecl = ast;
        if(TypeScript.hasFlag(argDecl.varFlags, TypeScript.VarFlags.Public | TypeScript.VarFlags.Private)) {
            var field = new TypeScript.ValueLocation();
            var isPrivate = TypeScript.hasFlag(argDecl.varFlags, TypeScript.VarFlags.Private);
            var fieldSymbol = new TypeScript.FieldSymbol(argDecl.id.text, argDecl.id.minChar, context.checker.locationInfo.unitIndex, !TypeScript.hasFlag(argDecl.varFlags, TypeScript.VarFlags.Readonly), field);
            fieldSymbol.transferVarFlags(argDecl.varFlags);
            field.symbol = fieldSymbol;
            fieldSymbol.declAST = ast;
            argDecl.parameterPropertySym = fieldSymbol;
            context.scopeChain.scope.enter(context.scopeChain.container, ast, fieldSymbol, context.checker.errorReporter, !isPrivate, false, false);
            field.typeLink = TypeScript.getTypeLink(argDecl.typeExpr, context.checker, argDecl.init == null);
            argDecl.sym = fieldSymbol;
        }
        return false;
    }