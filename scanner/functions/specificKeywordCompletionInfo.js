function specificKeywordCompletionInfo(entries, isNewIdentifierLocation) {
            return {
                isGlobalCompletion: false,
                isMemberCompletion: false,
                isNewIdentifierLocation,
                entries: entries.slice()
            };
        }