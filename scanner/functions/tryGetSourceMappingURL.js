function tryGetSourceMappingURL(lineInfo) {
            for (let index = lineInfo.getLineCount() - 1; index >= 0; index--) {
                const line = lineInfo.getLineText(index);
                const comment = sourceMapCommentRegExp.exec(line);
                if (comment) {
                    return trimStringEnd(comment[1]);
                }
                else if (!line.match(whitespaceOrMapCommentRegExp)) {
                    break;
                }
            }
        }