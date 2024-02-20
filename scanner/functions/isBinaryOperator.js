function isBinaryOperator(kind) {
            return isAssignmentOperatorOrHigher(kind) || kind === 27 /* CommaToken */;
        }