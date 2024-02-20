function keywordCompletionData(keywordFilters, filterOutTsOnlyKeywords, isNewIdentifierLocation) {
            return {
                kind: 4 /* Keywords */,
                keywordCompletions: getKeywordCompletions(keywordFilters, filterOutTsOnlyKeywords),
                isNewIdentifierLocation
            };
        }