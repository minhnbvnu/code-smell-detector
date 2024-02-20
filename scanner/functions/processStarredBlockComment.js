function processStarredBlockComment(comment) {
                const lines = comment.value.split(astUtils.LINEBREAK_MATCHER)
                    .filter((line, i, linesArr) => !(i === 0 || i === linesArr.length - 1))
                    .map(line => line.replace(/^\s*$/u, ""));
                const allLinesHaveLeadingSpace = lines
                    .map(line => line.replace(/\s*\*/u, ""))
                    .filter(line => line.trim().length)
                    .every(line => line.startsWith(" "));
                return lines.map(line => line.replace(allLinesHaveLeadingSpace ? /\s*\* ?/u : /\s*\*/u, ""));
            }