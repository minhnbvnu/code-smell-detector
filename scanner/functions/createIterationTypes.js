function createIterationTypes(yieldType = neverType, returnType = neverType, nextType = unknownType) {
                if (yieldType.flags & 67359327 /* Intrinsic */ && returnType.flags & (1 /* Any */ | 131072 /* Never */ | 2 /* Unknown */ | 16384 /* Void */ | 32768 /* Undefined */) && nextType.flags & (1 /* Any */ | 131072 /* Never */ | 2 /* Unknown */ | 16384 /* Void */ | 32768 /* Undefined */)) {
                    const id = getTypeListId([yieldType, returnType, nextType]);
                    let iterationTypes = iterationTypesCache.get(id);
                    if (!iterationTypes) {
                        iterationTypes = { yieldType, returnType, nextType };
                        iterationTypesCache.set(id, iterationTypes);
                    }
                    return iterationTypes;
                }
                return { yieldType, returnType, nextType };
            }