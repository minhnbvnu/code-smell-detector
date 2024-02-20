function createCompletionDetails(name, kindModifiers, kind, displayParts, documentation, tags, codeActions, source) {
            return { name, kindModifiers, kind, displayParts, documentation, tags, codeActions, source, sourceDisplay: source };
        }