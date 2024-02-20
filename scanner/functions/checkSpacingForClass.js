function checkSpacingForClass(node) {
                checkSpacingAroundFirstToken(node);
                checkSpacingAroundTokenBefore(node.superClass);
            }