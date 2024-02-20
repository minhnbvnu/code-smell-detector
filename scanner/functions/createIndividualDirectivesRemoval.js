function createIndividualDirectivesRemoval(directives, commentToken) {
        /*
         * `commentToken.value` starts right after `//` or `/*`.
         * All calculated offsets will be relative to this index.
         */
        const commentValueStart = commentToken.range[0] + "//".length;
        // Find where the list of rules starts. `\S+` matches with the directive name (e.g. `eslint-disable-line`)
        const listStartOffset = /^\s*\S+\s+/u.exec(commentToken.value)[0].length;
        /*
         * Get the list text without any surrounding whitespace. In order to preserve the original
         * formatting, we don't want to change that whitespace.
         *
         *     // eslint-disable-line rule-one , rule-two , rule-three -- comment
         *                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         */
        const listText = commentToken.value
            .slice(listStartOffset) // remove directive name and all whitespace before the list
            .split(/\s-{2,}\s/u)[0] // remove `-- comment`, if it exists
            .trimEnd(); // remove all whitespace after the list
        /*
         * We can assume that `listText` contains multiple elements.
         * Otherwise, this function wouldn't be called - if there is
         * only one rule in the list, then the whole comment must be removed.
         */
        return directives.map(directive => {
            const { ruleId } = directive;
            const regex = new RegExp(String.raw `(?:^|\s*,\s*)${escapeRegExp(ruleId)}(?:\s*,\s*|$)`, "u");
            const match = regex.exec(listText);
            const matchedText = match[0];
            const matchStartOffset = listStartOffset + match.index;
            const matchEndOffset = matchStartOffset + matchedText.length;
            const firstIndexOfComma = matchedText.indexOf(",");
            const lastIndexOfComma = matchedText.lastIndexOf(",");
            let removalStartOffset, removalEndOffset;
            if (firstIndexOfComma !== lastIndexOfComma) {
                /*
                 * Since there are two commas, this must one of the elements in the middle of the list.
                 * Matched range starts where the previous rule name ends, and ends where the next rule name starts.
                 *
                 *     // eslint-disable-line rule-one , rule-two , rule-three -- comment
                 *                                    ^^^^^^^^^^^^^^
                 *
                 * We want to remove only the content between the two commas, and also one of the commas.
                 *
                 *     // eslint-disable-line rule-one , rule-two , rule-three -- comment
                 *                                     ^^^^^^^^^^^
                 */
                removalStartOffset = matchStartOffset + firstIndexOfComma;
                removalEndOffset = matchStartOffset + lastIndexOfComma;
            }
            else {
                /*
                 * This is either the first element or the last element.
                 *
                 * If this is the first element, matched range starts where the first rule name starts
                 * and ends where the second rule name starts. This is exactly the range we want
                 * to remove so that the second rule name will start where the first one was starting
                 * and thus preserve the original formatting.
                 *
                 *     // eslint-disable-line rule-one , rule-two , rule-three -- comment
                 *                            ^^^^^^^^^^^
                 *
                 * Similarly, if this is the last element, we've already matched the range we want to
                 * remove. The previous rule name will end where the last one was ending, relative
                 * to the content on the right side.
                 *
                 *     // eslint-disable-line rule-one , rule-two , rule-three -- comment
                 *                                               ^^^^^^^^^^^^^
                 */
                removalStartOffset = matchStartOffset;
                removalEndOffset = matchEndOffset;
            }
            return {
                description: `'${ruleId}'`,
                fix: {
                    range: [
                        commentValueStart + removalStartOffset,
                        commentValueStart + removalEndOffset
                    ],
                    text: ""
                },
                unprocessedDirective: directive.unprocessedDirective
            };
        });
    }