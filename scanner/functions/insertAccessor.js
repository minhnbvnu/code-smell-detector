function insertAccessor(changeTracker, file, accessor, declaration, container) {
            isParameterPropertyDeclaration(declaration, declaration.parent) ? changeTracker.insertMemberAtStart(file, container, accessor) : isPropertyAssignment(declaration) ? changeTracker.insertNodeAfterComma(file, declaration, accessor) : changeTracker.insertNodeAfter(file, declaration, accessor);
        }