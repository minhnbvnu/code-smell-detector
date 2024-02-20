function findImplementationOrAllInitialDeclarations(typeChecker, node) {
            var _a2, _b, _c;
            if (isClassStaticBlockDeclaration(node)) {
                return node;
            }
            if (isFunctionLikeDeclaration(node)) {
                return (_b = (_a2 = findImplementation(typeChecker, node)) != null ? _a2 : findAllInitialDeclarations(typeChecker, node)) != null ? _b : node;
            }
            return (_c = findAllInitialDeclarations(typeChecker, node)) != null ? _c : node;
        }