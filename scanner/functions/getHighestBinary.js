function getHighestBinary(b) {
            return isBinaryExpression(b.parent) ? getHighestBinary(b.parent) : b;
        }