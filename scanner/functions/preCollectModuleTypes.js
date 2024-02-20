function preCollectModuleTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        var moduleDecl = ast;
        var isAmbient = TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.Ambient);
        var isEnum = TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.IsEnum);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var isExported = TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.Exported);
        var modName = (moduleDecl.name).text;
        var isDynamic = TypeScript.isQuoted(modName);
        var symbol = scopeChain.scope.findLocal(modName, false, false);
        var typeSymbol = null;
        var modType = null;
        if((symbol == null) || (symbol.kind() != TypeScript.SymbolKind.Type)) {
            if(modType == null) {
                var enclosedTypes = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                var ambientEnclosedTypes = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                modType = new TypeScript.ModuleType(enclosedTypes, ambientEnclosedTypes);
                if(isEnum) {
                    modType.typeFlags |= TypeScript.TypeFlags.IsEnum;
                }
                modType.members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                modType.ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                modType.setHasImplementation();
            }
            typeSymbol = new TypeScript.TypeSymbol(modName, moduleDecl.name.minChar, modName.length, context.checker.locationInfo.unitIndex, modType);
            typeSymbol.isDynamic = TypeScript.isQuoted(moduleDecl.prettyName);
            if(context.scopeChain.moduleDecl) {
                typeSymbol.declModule = context.scopeChain.moduleDecl;
            }
            typeSymbol.declAST = moduleDecl;
            typeSymbol.prettyName = moduleDecl.prettyName;
            scopeChain.scope.enter(scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isExported || isGlobal, true, isAmbient);
            scopeChain.scope.enter(scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isExported || isGlobal, false, isAmbient);
            modType.symbol = typeSymbol;
        } else {
            if(symbol && symbol.declAST && symbol.declAST.nodeType != TypeScript.NodeType.ModuleDeclaration) {
                context.checker.errorReporter.simpleError(moduleDecl, "Conflicting symbol name for module '" + modName + "'");
            }
            typeSymbol = symbol;
            var publicEnclosedTypes = typeSymbol.type.getAllEnclosedTypes().publicMembers;
            var publicEnclosedTypesTable = (publicEnclosedTypes == null) ? new TypeScript.StringHashTable() : publicEnclosedTypes;
            var enclosedTypes = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(publicEnclosedTypesTable, new TypeScript.StringHashTable()));
            var publicEnclosedAmbientTypes = typeSymbol.type.getAllAmbientEnclosedTypes().publicMembers;
            var publicAmbientEnclosedTypesTable = (publicEnclosedAmbientTypes == null) ? new TypeScript.StringHashTable() : publicEnclosedAmbientTypes;
            var ambientEnclosedTypes = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(publicAmbientEnclosedTypesTable, new TypeScript.StringHashTable()));
            var publicMembers = typeSymbol.type.members.publicMembers;
            var publicMembersTable = (publicMembers == null) ? new TypeScript.StringHashTable() : publicMembers;
            var members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(publicMembersTable, new TypeScript.StringHashTable()));
            var publicAmbientMembers = typeSymbol.type.ambientMembers.publicMembers;
            var publicAmbientMembersTable = (publicAmbientMembers == null) ? new TypeScript.StringHashTable() : publicAmbientMembers;
            var ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(publicAmbientMembersTable, new TypeScript.StringHashTable()));
            modType = new TypeScript.ModuleType(enclosedTypes, ambientEnclosedTypes);
            if(isEnum) {
                modType.typeFlags |= TypeScript.TypeFlags.IsEnum;
            }
            modType.members = members;
            modType.ambientMembers = ambientMembers;
            modType.setHasImplementation();
            modType.symbol = typeSymbol;
            typeSymbol.addLocation(moduleDecl.minChar);
            typeSymbol.expansions.push(modType);
            typeSymbol.expansionsDeclAST.push(moduleDecl);
        }
        if(context.scopeChain.moduleDecl) {
            context.scopeChain.moduleDecl.recordNonInterface();
        }
        if(isExported) {
            typeSymbol.flags |= TypeScript.SymbolFlags.Exported;
        }
        if((context.scopeChain.moduleDecl) || (context.scopeChain.container == context.checker.gloMod)) {
            typeSymbol.flags |= TypeScript.SymbolFlags.ModuleMember;
        }
        moduleDecl.mod = modType;
        TypeScript.pushTypeCollectionScope(typeSymbol, modType.members, modType.ambientMembers, modType.enclosedTypes, modType.ambientEnclosedTypes, context, null, null, moduleDecl);
        return true;
    }