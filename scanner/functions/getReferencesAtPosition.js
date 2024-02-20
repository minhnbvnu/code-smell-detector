function getReferencesAtPosition(fileName, position) {
                synchronizeHostData();
                return getReferencesWorker(getTouchingPropertyName(getValidSourceFile(fileName), position), position, { use: ts_FindAllReferences_exports.FindReferencesUse.References }, ts_FindAllReferences_exports.toReferenceEntry);
            }