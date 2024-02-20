function getDefinitionAndBoundSpan2(fileName, position) {
                synchronizeHostData();
                return ts_GoToDefinition_exports.getDefinitionAndBoundSpan(program, getValidSourceFile(fileName), position);
            }