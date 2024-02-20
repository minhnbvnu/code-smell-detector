function createBody(block, quotePreference2, ambient2) {
                return ambient2 ? void 0 : getSynthesizedDeepClone(block, 
                /*includeTrivia*/
                false) || createStubbedMethodBody(quotePreference2);
            }