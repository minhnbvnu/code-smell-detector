function isNewExpressionTarget(node, includeElementAccess = false, skipPastOuterExpressions = false) {
            return isCalleeWorker(node, isNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
        }