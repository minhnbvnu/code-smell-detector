function checkGrammarForDisallowedTrailingComma(list, diag2 = Diagnostics.Trailing_comma_not_allowed) {
                if (list && list.hasTrailingComma) {
                    return grammarErrorAtPos(list[0], list.end - ",".length, ",".length, diag2);
                }
                return false;
            }