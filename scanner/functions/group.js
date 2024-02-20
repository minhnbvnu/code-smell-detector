function group(values, getGroupId, resultSelector = identity) {
            return arrayFrom(arrayToMultiMap(values, getGroupId).values(), resultSelector);
        }