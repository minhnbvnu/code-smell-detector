function isSameScopeDescendentOf(initial, parent2, stopAt) {
                return !!parent2 && !!findAncestor(initial, (n) => n === parent2 || (n === stopAt || isFunctionLike(n) && (!getImmediatelyInvokedFunctionExpression(n) || isAsyncFunction(n)) ? "quit" : false));
            }