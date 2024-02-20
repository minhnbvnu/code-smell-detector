function getThisTypeOfDeclaration(declaration) {
                return getThisTypeOfSignature(getSignatureFromDeclaration(declaration));
            }