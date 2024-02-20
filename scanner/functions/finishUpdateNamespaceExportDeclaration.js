function finishUpdateNamespaceExportDeclaration(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                }
                return update(updated, original);
            }