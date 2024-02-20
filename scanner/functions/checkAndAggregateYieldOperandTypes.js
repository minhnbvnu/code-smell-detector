function checkAndAggregateYieldOperandTypes(func, checkMode) {
                const yieldTypes = [];
                const nextTypes = [];
                const isAsync = (getFunctionFlags(func) & 2 /* Async */) !== 0;
                forEachYieldExpression(func.body, (yieldExpression) => {
                    const yieldExpressionType = yieldExpression.expression ? checkExpression(yieldExpression.expression, checkMode) : undefinedWideningType;
                    pushIfUnique(yieldTypes, getYieldedTypeOfYieldExpression(yieldExpression, yieldExpressionType, anyType, isAsync));
                    let nextType;
                    if (yieldExpression.asteriskToken) {
                        const iterationTypes = getIterationTypesOfIterable(yieldExpressionType, isAsync ? 19 /* AsyncYieldStar */ : 17 /* YieldStar */, yieldExpression.expression);
                        nextType = iterationTypes && iterationTypes.nextType;
                    }
                    else {
                        nextType = getContextualType2(yieldExpression, 
                        /*contextFlags*/
                        void 0);
                    }
                    if (nextType)
                        pushIfUnique(nextTypes, nextType);
                });
                return { yieldTypes, nextTypes };
            }