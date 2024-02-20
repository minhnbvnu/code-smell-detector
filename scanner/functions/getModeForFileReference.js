function getModeForFileReference(ref, containingFileMode) {
            return (isString(ref) ? containingFileMode : ref.resolutionMode) || containingFileMode;
        }