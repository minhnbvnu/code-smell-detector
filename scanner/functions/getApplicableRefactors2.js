function getApplicableRefactors2(fileName, positionOrRange, preferences = emptyOptions, triggerReason, kind) {
                synchronizeHostData();
                const file = getValidSourceFile(fileName);
                return ts_refactor_exports.getApplicableRefactors(getRefactorContext(file, positionOrRange, preferences, emptyOptions, triggerReason, kind));
            }