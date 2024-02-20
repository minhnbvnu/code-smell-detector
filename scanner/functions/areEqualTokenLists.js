function areEqualTokenLists(left, right) {
        if (left.length !== right.length) {
            return false;
        }
        for (let i = 0; i < left.length; i++) {
            const leftToken = left[i], rightToken = right[i];
            if (leftToken.type !== rightToken.type || leftToken.value !== rightToken.value) {
                return false;
            }
        }
        return true;
    }