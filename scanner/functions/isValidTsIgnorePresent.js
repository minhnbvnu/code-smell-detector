function isValidTsIgnorePresent(comment) {
                const line = getLastCommentLine(comment);
                return isLineComment(comment)
                    ? tsIgnoreRegExpSingleLine.test(line)
                    : tsIgnoreRegExpMultiLine.test(line);
            }