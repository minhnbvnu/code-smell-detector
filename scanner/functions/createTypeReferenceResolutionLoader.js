function createTypeReferenceResolutionLoader(containingFile, redirectedReference, options, host, cache) {
            return {
                nameAndMode: typeReferenceResolutionNameAndModeGetter,
                resolve: (typeRef, resoluionMode) => resolveTypeReferenceDirective(typeRef, containingFile, options, host, redirectedReference, cache, resoluionMode)
            };
        }