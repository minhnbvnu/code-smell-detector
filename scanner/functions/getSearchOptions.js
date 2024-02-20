function getSearchOptions(searchPattern) {
    try {
        const regExp = new RegExp(searchPattern, 'ig');

        const testInfiniteMatching = regExp.exec('testInfiniteMatching');
        if (testInfiniteMatching !== null && testInfiniteMatching[0].length === 0) {
            return {
                isRegExp: false,
            };
        } else {
            return {
                isRegExp: true,
                iterate(input, matchCount, addNoMatch, addMatch) {
                    const regExp = new RegExp(searchPattern, 'ig');

                    let lastDatumIndex = 0;

                    let match;
                    while ((match = regExp.exec(input)) !== null) {
                        if (match.index > lastDatumIndex) {
                            addNoMatch(lastDatumIndex, match.index);
                        }

                        if (matchCount < MAX_MATCH_COUNT) {
                            addMatch(match[0], matchCount);

                            matchCount++;

                            lastDatumIndex = regExp.lastIndex;
                        } else {
                            // You reached the max number of matches possible. No more evaluation!
                            matchCount++;

                            break;
                        }
                    }

                    return {
                        matchCount,
                        lastDatumIndex,
                    };
                },
            };
        }
    } catch(ex) {
        return {
            isRegExp: false,
            iterate(input, matchCount, addNoMatch, addMatch) {
                let lastDatumIndex = 0;
                let index;
                const lowerCaseInput = input.toLowerCase();
                const lowerCasePattern = searchPattern.toLowerCase();
                while ((index = lowerCaseInput.substring(lastDatumIndex).indexOf(lowerCasePattern)) !== -1) {
                    if (index > 0) {
                        addNoMatch(lastDatumIndex, index + lastDatumIndex);
                    }

                    if (matchCount < MAX_MATCH_COUNT) {
                        addMatch(searchPattern, matchCount);

                        matchCount++;

                        lastDatumIndex += index + lowerCasePattern.length;
                    } else {
                        // You reached the max number of matches possible. No more evaluation!
                        matchCount++;

                        break;
                    }
                }

                return {
                    matchCount,
                    lastDatumIndex,
                };
            },
        };
    }
}