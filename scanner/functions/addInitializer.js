function addInitializer(changeTracker, propertyDeclarationSourceFile, propertyDeclaration, initializer) {
            suppressLeadingAndTrailingTrivia(propertyDeclaration);
            const property = factory.updatePropertyDeclaration(propertyDeclaration, propertyDeclaration.modifiers, propertyDeclaration.name, propertyDeclaration.questionToken, propertyDeclaration.type, initializer);
            changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
        }