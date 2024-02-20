function processBareBlockComment(comment) {
                const lines = comment.value.split(astUtils.LINEBREAK_MATCHER).map(line => line.replace(/^\s*$/u, ""));
                const leadingWhitespace = `${sourceCode.text.slice(comment.range[0] - comment.loc.start.column, comment.range[0])}   `;
                let offset = "";
                /*
                 * Calculate the offset of the least indented line and use that as the basis for offsetting all the lines.
                 * The first line should not be checked because it is inline with the opening block comment delimiter.
                 */
                for (const [i, line] of lines.entries()) {
                    if (!line.trim().length || i === 0) {
                        continue;
                    }
                    const [, lineOffset] = line.match(/^(\s*\*?\s*)/u);
                    if (lineOffset.length < leadingWhitespace.length) {
                        const newOffset = leadingWhitespace.slice(lineOffset.length - leadingWhitespace.length);
                        if (newOffset.length > offset.length) {
                            offset = newOffset;
                        }
                    }
                }
                return lines.map(line => {
                    const match = line.match(/^(\s*\*?\s*)(.*)/u);
                    const [, lineOffset, lineContents] = match;
                    if (lineOffset.length > leadingWhitespace.length) {
                        return `${lineOffset.slice(leadingWhitespace.length - (offset.length + lineOffset.length))}${lineContents}`;
                    }
                    if (lineOffset.length < leadingWhitespace.length) {
                        return `${lineOffset.slice(leadingWhitespace.length)}${lineContents}`;
                    }
                    return lineContents;
                });
            }