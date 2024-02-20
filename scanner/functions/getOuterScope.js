function getOuterScope(scope) {
                const upper = scope.upper;
                if ((upper === null || upper === void 0 ? void 0 : upper.type) === 'function-expression-name') {
                    return upper.upper;
                }
                return upper;
            }