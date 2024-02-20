function skipAssertions(node) {
            return skipOuterExpressions(node, 6 /* Assertions */);
        }