function checkSpacingForIfStatement(node) {
                checkSpacingAroundFirstToken(node);
                checkSpacingAroundTokenBefore(node.alternate);
            }