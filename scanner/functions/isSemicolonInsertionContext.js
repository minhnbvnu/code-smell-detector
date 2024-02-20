function isSemicolonInsertionContext(context) {
            return positionIsASICandidate(context.currentTokenSpan.end, context.currentTokenParent, context.sourceFile);
        }