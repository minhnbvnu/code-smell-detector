function getEnclosingDeclarationIgnoringFakeScope(enclosingDeclaration) {
                    return getNodeLinks(enclosingDeclaration).fakeScopeForSignatureDeclaration ? enclosingDeclaration.parent : enclosingDeclaration;
                }