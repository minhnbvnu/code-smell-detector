function getContextualIterationType(kind, functionDecl) {
                const isAsync = !!(getFunctionFlags(functionDecl) & 2 /* Async */);
                const contextualReturnType = getContextualReturnType(functionDecl, 
                /*contextFlags*/
                void 0);
                if (contextualReturnType) {
                    return getIterationTypeOfGeneratorFunctionReturnType(kind, contextualReturnType, isAsync) || void 0;
                }
                return void 0;
            }