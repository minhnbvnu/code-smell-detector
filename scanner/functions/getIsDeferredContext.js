function getIsDeferredContext(location, lastLocation) {
                if (location.kind !== 216 /* ArrowFunction */ && location.kind !== 215 /* FunctionExpression */) {
                    return isTypeQueryNode(location) || (isFunctionLikeDeclaration(location) || location.kind === 169 /* PropertyDeclaration */ && !isStatic(location)) && (!lastLocation || lastLocation !== location.name);
                }
                if (lastLocation && lastLocation === location.name) {
                    return false;
                }
                if (location.asteriskToken || hasSyntacticModifier(location, 512 /* Async */)) {
                    return true;
                }
                return !getImmediatelyInvokedFunctionExpression(location);
            }