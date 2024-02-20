function nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate() {
                        nextToken();
                        return tokenIsIdentifierOrKeyword(token()) || token() === 22 /* OpenBracketToken */ || isTemplateStartOfTaggedTemplate();
                    }