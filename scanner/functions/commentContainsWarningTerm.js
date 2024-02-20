function commentContainsWarningTerm(comment) {
                const matches = [];
                warningRegExps.forEach((regex, index) => {
                    if (regex.test(comment)) {
                        matches.push(warningTerms[index]);
                    }
                });
                return matches;
            }