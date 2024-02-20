function transformFinally(node, onFinally, transformer, hasContinuation, continuationArgName) {
            if (!onFinally || isNullOrUndefined2(transformer, onFinally)) {
                return transformExpression(
                /* returnContextNode */
                node, node.expression.expression, transformer, hasContinuation, continuationArgName);
            }
            const possibleNameForVarDecl = getPossibleNameForVarDecl(node, transformer, continuationArgName);
            const inlinedLeftHandSide = transformExpression(
            /*returnContextNode*/
            node, node.expression.expression, transformer, 
            /*hasContinuation*/
            true, possibleNameForVarDecl);
            if (hasFailed())
                return silentFail();
            const inlinedCallback = transformCallbackArgument(onFinally, hasContinuation, 
            /*continuationArgName*/
            void 0, 
            /*argName*/
            void 0, node, transformer);
            if (hasFailed())
                return silentFail();
            const tryBlock = factory.createBlock(inlinedLeftHandSide);
            const finallyBlock = factory.createBlock(inlinedCallback);
            const tryStatement = factory.createTryStatement(tryBlock, 
            /*catchClause*/
            void 0, finallyBlock);
            return finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName);
        }