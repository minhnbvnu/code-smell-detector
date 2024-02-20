function transformCatch(node, onRejected, transformer, hasContinuation, continuationArgName) {
            if (!onRejected || isNullOrUndefined2(transformer, onRejected)) {
                return transformExpression(
                /* returnContextNode */
                node, node.expression.expression, transformer, hasContinuation, continuationArgName);
            }
            const inputArgName = getArgBindingName(onRejected, transformer);
            const possibleNameForVarDecl = getPossibleNameForVarDecl(node, transformer, continuationArgName);
            const inlinedLeftHandSide = transformExpression(
            /*returnContextNode*/
            node, node.expression.expression, transformer, 
            /*hasContinuation*/
            true, possibleNameForVarDecl);
            if (hasFailed())
                return silentFail();
            const inlinedCallback = transformCallbackArgument(onRejected, hasContinuation, possibleNameForVarDecl, inputArgName, node, transformer);
            if (hasFailed())
                return silentFail();
            const tryBlock = factory.createBlock(inlinedLeftHandSide);
            const catchClause = factory.createCatchClause(inputArgName && getSynthesizedDeepClone(declareSynthBindingName(inputArgName)), factory.createBlock(inlinedCallback));
            const tryStatement = factory.createTryStatement(tryBlock, catchClause, 
            /*finallyBlock*/
            void 0);
            return finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName);
        }