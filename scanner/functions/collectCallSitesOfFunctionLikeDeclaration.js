function collectCallSitesOfFunctionLikeDeclaration(typeChecker, node, collect) {
            const implementation = findImplementation(typeChecker, node);
            if (implementation) {
                forEach(implementation.parameters, collect);
                collect(implementation.body);
            }
        }