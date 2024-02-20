function makeCompositeTypeMapper(kind, mapper1, mapper2) {
                return Debug.attachDebugPrototypeIfDebug({ kind, mapper1, mapper2 });
            }