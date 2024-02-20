function finishUpdateFunctionTypeNode(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }