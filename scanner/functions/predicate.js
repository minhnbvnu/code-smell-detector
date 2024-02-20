function predicate(testScope) {
                if (testScope.type === 'function' && testScope.functionExpressionScope) {
                    return false;
                }
                return true;
            }