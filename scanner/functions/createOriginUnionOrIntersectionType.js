function createOriginUnionOrIntersectionType(flags, types) {
                const result = createOriginType(flags);
                result.types = types;
                return result;
            }