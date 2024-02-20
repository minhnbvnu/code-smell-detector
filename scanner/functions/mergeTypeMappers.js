function mergeTypeMappers(mapper1, mapper2) {
                return mapper1 ? makeCompositeTypeMapper(5 /* Merged */, mapper1, mapper2) : mapper2;
            }