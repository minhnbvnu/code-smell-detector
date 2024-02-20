function updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName) {
            let assignment = factory.updatePropertyAssignment(declaration, fieldName, declaration.initializer);
            if (assignment.modifiers || assignment.questionToken || assignment.exclamationToken) {
                if (assignment === declaration)
                    assignment = factory.cloneNode(assignment);
                assignment.modifiers = void 0;
                assignment.questionToken = void 0;
                assignment.exclamationToken = void 0;
            }
            changeTracker.replacePropertyAssignment(file, declaration, assignment);
        }