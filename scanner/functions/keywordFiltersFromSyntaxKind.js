function keywordFiltersFromSyntaxKind(keywordCompletion) {
            switch (keywordCompletion) {
                case 154 /* TypeKeyword */:
                    return 8 /* TypeKeyword */;
                default:
                    Debug.fail("Unknown mapping from SyntaxKind to KeywordCompletionFilters");
            }
        }