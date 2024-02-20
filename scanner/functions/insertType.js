function insertType(types, type) {
                const index = binarySearch(types, type, getTypeId, compareValues);
                if (index < 0) {
                    types.splice(~index, 0, type);
                    return true;
                }
                return false;
            }