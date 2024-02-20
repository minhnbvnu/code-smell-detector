function isRelationalOperatorOrHigher(kind) {
            return isRelationalOperator(kind) || isShiftOperatorOrHigher(kind);
        }