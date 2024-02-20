function finishUpdateBaseSignatureDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeArguments = original.typeArguments;
                }
                return update(updated, original);
            }