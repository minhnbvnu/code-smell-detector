function keywordToCompletionEntry(keyword) {
            return {
                name: tokenToString(keyword),
                kind: "keyword" /* keyword */,
                kindModifiers: "" /* none */,
                sortText: SortText.GlobalsOrKeywords
            };
        }