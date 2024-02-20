function checkSpacingForDoWhileStatement(node) {
                checkSpacingAroundFirstToken(node);
                checkSpacingAroundTokenBefore(node.test);
            }