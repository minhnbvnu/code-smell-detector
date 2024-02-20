function tryGetSignatureDeclaration(typeChecker, node) {
            const callLike = getAncestorCallLikeExpression(node);
            const signature = callLike && typeChecker.getResolvedSignature(callLike);
            return tryCast(signature && signature.declaration, (d) => isFunctionLike(d) && !isFunctionTypeNode(d));
        }