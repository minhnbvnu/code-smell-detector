function finishUpdatePropertyAssignment(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                    updated.questionToken = original.questionToken;
                    updated.exclamationToken = original.exclamationToken;
                }
                return update(updated, original);
            }