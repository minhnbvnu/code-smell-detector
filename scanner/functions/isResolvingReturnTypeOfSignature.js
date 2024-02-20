function isResolvingReturnTypeOfSignature(signature) {
                return !signature.resolvedReturnType && findResolutionCycleStartIndex(signature, 3 /* ResolvedReturnType */) >= 0;
            }