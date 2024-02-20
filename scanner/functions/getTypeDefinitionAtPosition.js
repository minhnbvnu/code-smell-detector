function getTypeDefinitionAtPosition(typeChecker, sourceFile, position) {
            const node = getTouchingPropertyName(sourceFile, position);
            if (node === sourceFile) {
                return void 0;
            }
            if (isImportMeta(node.parent) && node.parent.name === node) {
                return definitionFromType(typeChecker.getTypeAtLocation(node.parent), typeChecker, node.parent, 
                /*failedAliasResolution*/
                false);
            }
            const { symbol, failedAliasResolution } = getSymbol(node, typeChecker, 
            /*stopAtAlias*/
            false);
            if (!symbol)
                return void 0;
            const typeAtLocation = typeChecker.getTypeOfSymbolAtLocation(symbol, node);
            const returnType = tryGetReturnTypeOfFunction(symbol, typeAtLocation, typeChecker);
            const fromReturnType = returnType && definitionFromType(returnType, typeChecker, node, failedAliasResolution);
            const typeDefinitions = fromReturnType && fromReturnType.length !== 0 ? fromReturnType : definitionFromType(typeAtLocation, typeChecker, node, failedAliasResolution);
            return typeDefinitions.length ? typeDefinitions : !(symbol.flags & 111551 /* Value */) && symbol.flags & 788968 /* Type */ ? getDefinitionFromSymbol(typeChecker, skipAlias(symbol, typeChecker), node, failedAliasResolution) : void 0;
        }