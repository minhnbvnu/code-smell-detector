function isPaddingBetweenTokens(first, second) {
                return second.loc.start.line - first.loc.end.line >= 2;
            }