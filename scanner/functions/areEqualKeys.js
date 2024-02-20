function areEqualKeys(left, right) {
        if (typeof left === "string" && typeof right === "string") {
            // Statically computed names.
            return left === right;
        }
        if (Array.isArray(left) && Array.isArray(right)) {
            // Token lists.
            return areEqualTokenLists(left, right);
        }
        return false;
    }