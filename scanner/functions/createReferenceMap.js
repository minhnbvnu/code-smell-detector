function createReferenceMap(scope, outReferenceMap = new Map()) {
        for (const reference of scope.references) {
            if (reference.resolved === null) {
                continue;
            }
            outReferenceMap.set(reference.identifier, reference);
        }
        for (const childScope of scope.childScopes) {
            if (childScope.type !== "function") {
                createReferenceMap(childScope, outReferenceMap);
            }
        }
        return outReferenceMap;
    }