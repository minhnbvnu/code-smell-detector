function preCollectVarDeclTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        var varDecl = ast;
        var isAmbient = TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Ambient);
        var isExported = TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Exported);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var isProperty = TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Property);
        var isStatic = TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Static);
        var isPrivate = TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Private);
        var isOptional = TypeScript.hasFlag(varDecl.id.flags, TypeScript.ASTFlags.OptionalName);
        if(context.scopeChain.moduleDecl) {
            context.scopeChain.moduleDecl.recordNonInterface();
        }
        if(isProperty || isExported || (context.scopeChain.container == context.checker.gloMod) || context.scopeChain.moduleDecl) {
            if(isAmbient) {
                var existingSym = scopeChain.scope.findLocal(varDecl.id.text, false, false);
                if(existingSym) {
                    varDecl.sym = existingSym;
                    return false;
                }
            }
            if(varDecl.id == null) {
                context.checker.errorReporter.simpleError(varDecl, "Expected variable identifier at this location");
                return false;
            }
            var field = new TypeScript.ValueLocation();
            var fieldSymbol = new TypeScript.FieldSymbol(varDecl.id.text, varDecl.id.minChar, context.checker.locationInfo.unitIndex, (varDecl.varFlags & TypeScript.VarFlags.Readonly) == TypeScript.VarFlags.None, field);
            fieldSymbol.transferVarFlags(varDecl.varFlags);
            if(isOptional) {
                fieldSymbol.flags |= TypeScript.SymbolFlags.Optional;
            }
            field.symbol = fieldSymbol;
            fieldSymbol.declAST = ast;
            if((context.scopeChain.moduleDecl) || (context.scopeChain.container == context.checker.gloMod)) {
                fieldSymbol.flags |= TypeScript.SymbolFlags.ModuleMember;
                fieldSymbol.declModule = context.scopeChain.moduleDecl;
            }
            if(TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Property) && isStatic && context.scopeChain.classType) {
                if(!context.scopeChain.classType.members.publicMembers.add(varDecl.id.text, fieldSymbol)) {
                    context.checker.errorReporter.duplicateIdentifier(ast, fieldSymbol.name);
                }
                fieldSymbol.container = context.scopeChain.classType.symbol;
            } else {
                context.scopeChain.scope.enter(context.scopeChain.container, ast, fieldSymbol, context.checker.errorReporter, !isPrivate && (isProperty || isExported || isGlobal || isStatic), false, isAmbient);
            }
            if(TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Exported)) {
                fieldSymbol.flags |= TypeScript.SymbolFlags.Exported;
            }
            field.typeLink = TypeScript.getTypeLink(varDecl.typeExpr, context.checker, varDecl.init == null);
            varDecl.sym = fieldSymbol;
        }
        return false;
    }