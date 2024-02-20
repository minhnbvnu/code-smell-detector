function canRemoveSemicolon(node) {
                if (isRedundantSemi(sourceCode.getLastToken(node))) {
                    return true; // `;;` or `;}`
                }
                if (maybeClassFieldAsiHazard(node)) {
                    return false;
                }
                if (isOnSameLineWithNextToken(node)) {
                    return false; // One liner.
                }
                // continuation characters should not apply to class fields
                if (node.type !== "PropertyDefinition" &&
                    beforeStatementContinuationChars === "never" &&
                    !maybeAsiHazardAfter(node)) {
                    return true; // ASI works. This statement doesn't connect to the next.
                }
                if (!maybeAsiHazardBefore(sourceCode.getTokenAfter(node))) {
                    return true; // ASI works. The next token doesn't connect to this statement.
                }
                return false;
            }