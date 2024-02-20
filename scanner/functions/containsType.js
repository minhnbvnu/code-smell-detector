function containsType(types, type) {
                return binarySearch(types, type, getTypeId, compareValues) >= 0;
            }