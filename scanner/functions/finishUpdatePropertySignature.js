function finishUpdatePropertySignature(updated, original) {
                if (updated !== original) {
                    updated.initializer = original.initializer;
                }
                return update(updated, original);
            }