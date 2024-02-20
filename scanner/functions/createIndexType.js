function createIndexType(type, stringsOnly) {
                const result = createType(4194304 /* Index */);
                result.type = type;
                result.stringsOnly = stringsOnly;
                return result;
            }