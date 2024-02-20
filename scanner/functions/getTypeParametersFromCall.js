function getTypeParametersFromCall(node, checker) {
        const sig = checker.getResolvedSignature(node);
        const sigDecl = sig === null || sig === void 0 ? void 0 : sig.getDeclaration();
        if (!sigDecl) {
            return ts.isNewExpression(node)
                ? getTypeParametersFromType(node.expression, checker)
                : undefined;
        }
        return sigDecl.typeParameters;
    }