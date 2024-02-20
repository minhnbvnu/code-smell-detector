function isPayableFuncOrCons(node) {
            return isFuncOrConstructor(node) && isPayable(node);
        }