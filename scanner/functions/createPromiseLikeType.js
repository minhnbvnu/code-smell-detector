function createPromiseLikeType(promisedType) {
                const globalPromiseLikeType = getGlobalPromiseLikeType(
                /*reportErrors*/
                true);
                if (globalPromiseLikeType !== emptyGenericType) {
                    promisedType = getAwaitedTypeNoAlias(unwrapAwaitedType(promisedType)) || unknownType;
                    return createTypeReference(globalPromiseLikeType, [promisedType]);
                }
                return unknownType;
            }