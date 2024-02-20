function transformThen(node, onFulfilled, onRejected, transformer, hasContinuation, continuationArgName) {
            if (!onFulfilled || isNullOrUndefined2(transformer, onFulfilled)) {
                return transformCatch(node, onRejected, transformer, hasContinuation, continuationArgName);
            }
            if (onRejected && !isNullOrUndefined2(transformer, onRejected)) {
                return silentFail();
            }
            const inputArgName = getArgBindingName(onFulfilled, transformer);
            const inlinedLeftHandSide = transformExpression(node.expression.expression, node.expression.expression, transformer, 
            /*hasContinuation*/
            true, inputArgName);
            if (hasFailed())
                return silentFail();
            const inlinedCallback = transformCallbackArgument(onFulfilled, hasContinuation, continuationArgName, inputArgName, node, transformer);
            if (hasFailed())
                return silentFail();
            return concatenate(inlinedLeftHandSide, inlinedCallback);
        }