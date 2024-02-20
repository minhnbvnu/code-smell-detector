function getAngle(a, b) {
        var dotproduct = (0, exports.dot)(a, b);
        return Math.acos(2 * dotproduct * dotproduct - 1);
    }