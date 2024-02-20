function finishUpdateExportDeclaration(updated, original) {
                if (updated !== original) {
                    if (updated.modifiers === original.modifiers) {
                        updated.modifiers = original.modifiers;
                    }
                }
                return update(updated, original);
            }