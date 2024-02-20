function addMissingDeclarations(context, implementedTypeNode, sourceFile, classDeclaration, changeTracker, preferences) {
            const checker = context.program.getTypeChecker();
            const maybeHeritageClauseSymbol = getHeritageClauseSymbolTable(classDeclaration, checker);
            const implementedType = checker.getTypeAtLocation(implementedTypeNode);
            const implementedTypeSymbols = checker.getPropertiesOfType(implementedType);
            const nonPrivateAndNotExistedInHeritageClauseMembers = implementedTypeSymbols.filter(and(symbolPointsToNonPrivateMember, (symbol) => !maybeHeritageClauseSymbol.has(symbol.escapedName)));
            const classType = checker.getTypeAtLocation(classDeclaration);
            const constructor = find(classDeclaration.members, (m) => isConstructorDeclaration(m));
            if (!classType.getNumberIndexType()) {
                createMissingIndexSignatureDeclaration(implementedType, 1 /* Number */);
            }
            if (!classType.getStringIndexType()) {
                createMissingIndexSignatureDeclaration(implementedType, 0 /* String */);
            }
            const importAdder = createImportAdder(sourceFile, context.program, preferences, context.host);
            createMissingMemberNodes(classDeclaration, nonPrivateAndNotExistedInHeritageClauseMembers, sourceFile, context, preferences, importAdder, (member) => insertInterfaceMemberNode(sourceFile, classDeclaration, member));
            importAdder.writeFixes(changeTracker);
            function createMissingIndexSignatureDeclaration(type, kind) {
                const indexInfoOfKind = checker.getIndexInfoOfType(type, kind);
                if (indexInfoOfKind) {
                    insertInterfaceMemberNode(sourceFile, classDeclaration, checker.indexInfoToIndexSignatureDeclaration(indexInfoOfKind, classDeclaration, 
                    /*flags*/
                    void 0, getNoopSymbolTrackerWithResolver(context)));
                }
            }
            function insertInterfaceMemberNode(sourceFile2, cls, newElement) {
                if (constructor) {
                    changeTracker.insertNodeAfter(sourceFile2, constructor, newElement);
                }
                else {
                    changeTracker.insertMemberAtStart(sourceFile2, cls, newElement);
                }
            }
        }