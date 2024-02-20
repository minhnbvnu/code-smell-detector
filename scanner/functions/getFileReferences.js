function getFileReferences(fileName) {
                synchronizeHostData();
                return ts_FindAllReferences_exports.Core.getReferencesForFileName(fileName, program, program.getSourceFiles()).map(ts_FindAllReferences_exports.toReferenceEntry);
            }