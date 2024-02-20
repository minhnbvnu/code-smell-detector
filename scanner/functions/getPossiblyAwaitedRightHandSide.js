function getPossiblyAwaitedRightHandSide(checker, type, expr) {
            const rightHandSide = getSynthesizedDeepClone(expr);
            return !!checker.getPromisedTypeOfPromise(type) ? factory.createAwaitExpression(rightHandSide) : rightHandSide;
        }