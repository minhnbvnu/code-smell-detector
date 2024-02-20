function skipPartiallyEmittedExpressions(node) {
            return skipOuterExpressions(node, 8 /* PartiallyEmittedExpressions */);
        }