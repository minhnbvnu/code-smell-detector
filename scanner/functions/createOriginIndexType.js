function createOriginIndexType(type) {
                const result = createOriginType(4194304 /* Index */);
                result.type = type;
                return result;
            }