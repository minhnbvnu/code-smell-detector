function isUnwrappedReturnTypeVoidOrAny(func, returnType) {
                const unwrappedReturnType = unwrapReturnType(returnType, getFunctionFlags(func));
                return !!unwrappedReturnType && maybeTypeOfKind(unwrappedReturnType, 16384 /* Void */ | 3 /* AnyOrUnknown */);
            }