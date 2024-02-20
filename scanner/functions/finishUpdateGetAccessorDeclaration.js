function finishUpdateGetAccessorDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeParameters = original.typeParameters;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }