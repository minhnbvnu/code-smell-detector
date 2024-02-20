function isShiftOperatorOrHigher(kind) {
            return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind);
        }