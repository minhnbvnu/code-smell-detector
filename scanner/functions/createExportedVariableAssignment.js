function createExportedVariableAssignment(name, value, location) {
                return createVariableAssignment(name, value, location, 
                /*isExportedDeclaration*/
                true);
            }