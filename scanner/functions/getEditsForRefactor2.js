function getEditsForRefactor2(fileName, formatOptions, positionOrRange, refactorName13, actionName2, preferences = emptyOptions) {
                synchronizeHostData();
                const file = getValidSourceFile(fileName);
                return ts_refactor_exports.getEditsForRefactor(getRefactorContext(file, positionOrRange, preferences, formatOptions), refactorName13, actionName2);
            }