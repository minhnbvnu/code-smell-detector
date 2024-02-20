function getSourceFileFromReference(referencingFile, ref) {
                return getSourceFileFromReferenceWorker(resolveTripleslashReference(ref.fileName, referencingFile.fileName), getSourceFile);
            }