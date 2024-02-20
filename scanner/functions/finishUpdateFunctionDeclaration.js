function finishUpdateFunctionDeclaration(updated, original) {
                if (updated !== original) {
                    if (updated.modifiers === original.modifiers) {
                        updated.modifiers = original.modifiers;
                    }
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }