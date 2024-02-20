function isYieldOrYieldStarWithOperand(context) {
            return context.contextNode.kind === 226 /* YieldExpression */ && context.contextNode.expression !== void 0;
        }