function addDefiniteAssignmentAssertion(changeTracker, propertyDeclarationSourceFile, propertyDeclaration) {
            suppressLeadingAndTrailingTrivia(propertyDeclaration);
            const property = factory.updatePropertyDeclaration(propertyDeclaration, propertyDeclaration.modifiers, propertyDeclaration.name, factory.createToken(53 /* ExclamationToken */), propertyDeclaration.type, propertyDeclaration.initializer);
            changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
        }