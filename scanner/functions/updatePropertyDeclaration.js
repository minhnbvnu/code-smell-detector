function updatePropertyDeclaration(changeTracker, file, declaration, type, fieldName, modifiers) {
            const property = factory.updatePropertyDeclaration(declaration, modifiers, fieldName, declaration.questionToken || declaration.exclamationToken, type, declaration.initializer);
            changeTracker.replaceNode(file, declaration, property);
        }