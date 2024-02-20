function isSingleImplementation(functionDeclaration, checker) {
            return !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
        }