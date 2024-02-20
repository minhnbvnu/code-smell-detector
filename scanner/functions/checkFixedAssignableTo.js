function checkFixedAssignableTo(checker, declaration, exprType, type, isFunctionType) {
            if (isFunctionType) {
                const sig = checker.getSignatureFromDeclaration(declaration);
                if (sig) {
                    if (hasSyntacticModifier(declaration, 512 /* Async */)) {
                        exprType = checker.createPromiseType(exprType);
                    }
                    const newSig = checker.createSignature(declaration, sig.typeParameters, sig.thisParameter, sig.parameters, exprType, 
                    /*typePredicate*/
                    void 0, sig.minArgumentCount, sig.flags);
                    exprType = checker.createAnonymousType(
                    /*symbol*/
                    void 0, createSymbolTable(), [newSig], [], []);
                }
                else {
                    exprType = checker.getAnyType();
                }
            }
            return checker.isTypeAssignableTo(exprType, type);
        }