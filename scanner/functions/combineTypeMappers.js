function combineTypeMappers(mapper1, mapper2) {
                return mapper1 ? makeCompositeTypeMapper(4 /* Composite */, mapper1, mapper2) : mapper2;
            }