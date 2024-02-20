function getSpaceSuggestion(expressionText) {
                        for (const keyword of viableKeywordSuggestions) {
                            if (expressionText.length > keyword.length + 2 && startsWith(expressionText, keyword)) {
                                return `${keyword} ${expressionText.slice(keyword.length)}`;
                            }
                        }
                        return void 0;
                    }