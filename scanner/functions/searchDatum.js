function searchDatum(
    searchOptions,
    datum,
    matchCount,
    selectedMatchIndex
) {
    if (matchCount > MAX_MATCH_COUNT) {
        return {
            output: datum,
            matchCount,
            isRowMatch: false,
        };
    } else {
        let isRowMatch = false;
        const tokens = [];
        const datumString = datum !== null ? datum.toString() : '';

        const iterateResult = searchOptions.iterate(
            datumString,
            matchCount,
            (from, to) => {
                tokens.push({
                    output: datumString.substring(from, to),
                    isMatch: false,
                });
            },
            (match, matchCount) => {
                isRowMatch = true;

                tokens.push({
                    output: match,
                    matchIndex: matchCount,
                    isMatchSelected: matchCount === selectedMatchIndex,
                    isMatch: true,
                });
            }
        );

        if (iterateResult.lastDatumIndex < datumString.length && tokens.length > 0) {
            tokens.push({
                output: datumString.substring(iterateResult.lastDatumIndex, datumString.length),
                isMatch: false,
            });
        }

        return {
            output: tokens.length > 0 ? tokens : datum,
            matchCount: iterateResult.matchCount,
            isRowMatch,
        };
    }
}