function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;
                            if (!firstMatch) {
                                $.each(tokenGroup.matches, function(ndx, match) {
                                    if (match.isQuantifier === true) firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]); else if (match.hasOwnProperty("matches")) firstMatch = isFirstMatch(latestMatch, match);
                                    if (firstMatch) return false;
                                });
                            }
                            return firstMatch;
                        }