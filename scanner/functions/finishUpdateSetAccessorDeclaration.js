function finishUpdateSetAccessorDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeParameters = original.typeParameters;
                    updated.type = original.type;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }