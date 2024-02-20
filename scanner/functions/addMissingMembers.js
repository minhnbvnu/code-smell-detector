function addMissingMembers(classDeclaration, sourceFile, context, changeTracker, preferences) {
            const extendsNode = getEffectiveBaseTypeNode(classDeclaration);
            const checker = context.program.getTypeChecker();
            const instantiatedExtendsType = checker.getTypeAtLocation(extendsNode);
            const abstractAndNonPrivateExtendsSymbols = checker.getPropertiesOfType(instantiatedExtendsType).filter(symbolPointsToNonPrivateAndAbstractMember);
            const importAdder = createImportAdder(sourceFile, context.program, preferences, context.host);
            createMissingMemberNodes(classDeclaration, abstractAndNonPrivateExtendsSymbols, sourceFile, context, preferences, importAdder, (member) => changeTracker.insertMemberAtStart(sourceFile, classDeclaration, member));
            importAdder.writeFixes(changeTracker);
        }