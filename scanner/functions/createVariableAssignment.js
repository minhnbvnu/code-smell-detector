function createVariableAssignment(name, value, location, isExportedDeclaration) {
                hoistVariableDeclaration(factory2.cloneNode(name));
                return isExportedDeclaration ? createExportExpression(name, preventSubstitution(setTextRange(factory2.createAssignment(name, value), location))) : preventSubstitution(setTextRange(factory2.createAssignment(name, value), location));
            }