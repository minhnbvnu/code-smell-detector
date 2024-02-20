function isCalleeWorker(node, pred, calleeSelector, includeElementAccess, skipPastOuterExpressions) {
            let target = includeElementAccess ? climbPastPropertyOrElementAccess(node) : climbPastPropertyAccess(node);
            if (skipPastOuterExpressions) {
                target = skipOuterExpressions(target);
            }
            return !!target && !!target.parent && pred(target.parent) && calleeSelector(target.parent) === target;
        }