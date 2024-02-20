function processSeparateLineComments(commentGroup) {
                const allLinesHaveLeadingSpace = commentGroup
                    .map(({ value }) => value)
                    .filter(line => line.trim().length)
                    .every(line => line.startsWith(" "));
                return commentGroup.map(({ value }) => (allLinesHaveLeadingSpace ? value.replace(/^ /u, "") : value));
            }