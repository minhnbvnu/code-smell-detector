function convertPathCompletions(pathCompletions) {
            const isGlobalCompletion = false;
            const isNewIdentifierLocation = true;
            const entries = pathCompletions.map(({ name, kind, span, extension }) => ({ name, kind, kindModifiers: kindModifiersFromExtension(extension), sortText: SortText.LocationPriority, replacementSpan: span }));
            return { isGlobalCompletion, isMemberCompletion: false, isNewIdentifierLocation, entries };
        }