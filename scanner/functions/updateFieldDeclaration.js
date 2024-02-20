function updateFieldDeclaration(changeTracker, file, declaration, type, fieldName, modifiers) {
            if (isPropertyDeclaration(declaration)) {
                updatePropertyDeclaration(changeTracker, file, declaration, type, fieldName, modifiers);
            }
            else if (isPropertyAssignment(declaration)) {
                updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName);
            }
            else {
                changeTracker.replaceNode(file, declaration, factory.updateParameterDeclaration(declaration, modifiers, declaration.dotDotDotToken, cast(fieldName, isIdentifier), declaration.questionToken, declaration.type, declaration.initializer));
            }
        }