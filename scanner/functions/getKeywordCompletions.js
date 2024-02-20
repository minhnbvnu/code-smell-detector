function getKeywordCompletions(keywordFilter, filterOutTsOnlyKeywords) {
            if (!filterOutTsOnlyKeywords)
                return getTypescriptKeywordCompletions(keywordFilter);
            const index = keywordFilter + 8 /* Last */ + 1;
            return _keywordCompletions[index] || (_keywordCompletions[index] = getTypescriptKeywordCompletions(keywordFilter).filter((entry) => !isTypeScriptOnlyKeyword(stringToToken(entry.name))));
        }