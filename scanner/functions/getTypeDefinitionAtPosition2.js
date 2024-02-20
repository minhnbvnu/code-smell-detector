function getTypeDefinitionAtPosition2(fileName, position) {
                synchronizeHostData();
                return ts_GoToDefinition_exports.getTypeDefinitionAtPosition(program.getTypeChecker(), getValidSourceFile(fileName), position);
            }