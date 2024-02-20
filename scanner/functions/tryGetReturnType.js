function tryGetReturnType(typeChecker, node) {
            if (typeChecker.isImplementationOfOverload(node)) {
                const signatures = typeChecker.getTypeAtLocation(node).getCallSignatures();
                if (signatures.length > 1) {
                    return typeChecker.getUnionType(mapDefined(signatures, (s) => s.getReturnType()));
                }
            }
            const signature = typeChecker.getSignatureFromDeclaration(node);
            if (signature) {
                return typeChecker.getReturnTypeOfSignature(signature);
            }
        }