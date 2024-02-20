function getLabelCompletionAtPosition(node) {
            const entries = getLabelStatementCompletions(node);
            if (entries.length) {
                return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
            }
        }