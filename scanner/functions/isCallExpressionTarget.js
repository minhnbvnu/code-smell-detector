function isCallExpressionTarget(node, includeElementAccess = false, skipPastOuterExpressions = false) {
            return isCalleeWorker(node, isCallExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
        }