function setResolvedTypeReferenceDirective(sourceFile, typeReferenceDirectiveName, resolvedTypeReferenceDirective, mode) {
            if (!sourceFile.resolvedTypeReferenceDirectiveNames) {
                sourceFile.resolvedTypeReferenceDirectiveNames = createModeAwareCache();
            }
            sourceFile.resolvedTypeReferenceDirectiveNames.set(typeReferenceDirectiveName, mode, resolvedTypeReferenceDirective);
        }