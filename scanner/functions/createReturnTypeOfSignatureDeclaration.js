function createReturnTypeOfSignatureDeclaration(signatureDeclarationIn, enclosingDeclaration, flags, tracker) {
                const signatureDeclaration = getParseTreeNode(signatureDeclarationIn, isFunctionLike);
                if (!signatureDeclaration) {
                    return factory.createToken(131 /* AnyKeyword */);
                }
                const signature = getSignatureFromDeclaration(signatureDeclaration);
                return nodeBuilder.typeToTypeNode(getReturnTypeOfSignature(signature), enclosingDeclaration, flags | 1024 /* MultilineObjectLiterals */, tracker);
            }