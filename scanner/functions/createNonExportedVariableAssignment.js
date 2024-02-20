function createNonExportedVariableAssignment(name, value, location) {
                return createVariableAssignment(name, value, location, 
                /*isExportedDeclaration*/
                false);
            }