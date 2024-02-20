function climbPastPropertyAccess(node) {
            return isRightSideOfPropertyAccess(node) ? node.parent : node;
        }