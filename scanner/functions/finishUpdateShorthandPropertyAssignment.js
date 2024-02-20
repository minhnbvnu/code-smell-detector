function finishUpdateShorthandPropertyAssignment(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                    updated.questionToken = original.questionToken;
                    updated.exclamationToken = original.exclamationToken;
                    updated.equalsToken = original.equalsToken;
                }
                return update(updated, original);
            }