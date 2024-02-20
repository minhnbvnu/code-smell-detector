function checkSpacingForTryStatement(node) {
                checkSpacingAroundFirstToken(node);
                checkSpacingAroundFirstToken(node.handler);
                checkSpacingAroundTokenBefore(node.finalizer);
            }