function finishUpdateMethodDeclaration(updated, original) {
                if (updated !== original) {
                    updated.exclamationToken = original.exclamationToken;
                }
                return update(updated, original);
            }