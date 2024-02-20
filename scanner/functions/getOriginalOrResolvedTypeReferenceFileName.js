function getOriginalOrResolvedTypeReferenceFileName(result) {
            return result.resolvedTypeReferenceDirective && (result.resolvedTypeReferenceDirective.originalPath || result.resolvedTypeReferenceDirective.resolvedFileName);
        }