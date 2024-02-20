function getDefinitionAtPosition2(fileName, position, searchOtherFilesOnly, stopAtAlias) {
                synchronizeHostData();
                return ts_GoToDefinition_exports.getDefinitionAtPosition(program, getValidSourceFile(fileName), position, searchOtherFilesOnly, stopAtAlias);
            }