function isSelfReference(ref, nodes) {
        let scope = ref.from;
        while (scope) {
            if (nodes.has(scope.block)) {
                return true;
            }
            scope = scope.upper;
        }
        return false;
    }