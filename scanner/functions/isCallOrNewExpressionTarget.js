function isCallOrNewExpressionTarget(node, includeElementAccess = false, skipPastOuterExpressions = false) {
            return isCalleeWorker(node, isCallOrNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
        }