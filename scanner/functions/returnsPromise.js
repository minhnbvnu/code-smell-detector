function returnsPromise(node, checker) {
            const signature = checker.getSignatureFromDeclaration(node);
            const returnType = signature ? checker.getReturnTypeOfSignature(signature) : void 0;
            return !!returnType && !!checker.getPromisedTypeOfPromise(returnType);
        }