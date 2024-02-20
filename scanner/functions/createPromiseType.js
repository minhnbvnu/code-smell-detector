function createPromiseType(promisedType) {
                const globalPromiseType = getGlobalPromiseType(
                /*reportErrors*/
                true);
                if (globalPromiseType !== emptyGenericType) {
                    promisedType = getAwaitedTypeNoAlias(unwrapAwaitedType(promisedType)) || unknownType;
                    return createTypeReference(globalPromiseType, [promisedType]);
                }
                return unknownType;
            }