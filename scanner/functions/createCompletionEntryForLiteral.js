function createCompletionEntryForLiteral(sourceFile, preferences, literal) {
            return { name: completionNameForLiteral(sourceFile, preferences, literal), kind: "string" /* string */, kindModifiers: "" /* none */, sortText: SortText.LocationPriority };
        }