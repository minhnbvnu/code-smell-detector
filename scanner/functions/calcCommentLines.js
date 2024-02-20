function calcCommentLines(node, lineNumTokenBefore) {
                const comments = sourceCode.getCommentsBefore(node);
                let numLinesComments = 0;
                if (!comments.length) {
                    return numLinesComments;
                }
                comments.forEach(comment => {
                    numLinesComments++;
                    if (comment.type === "Block") {
                        numLinesComments += comment.loc.end.line - comment.loc.start.line;
                    }
                    // avoid counting lines with inline comments twice
                    if (comment.loc.start.line === lineNumTokenBefore) {
                        numLinesComments--;
                    }
                    if (comment.loc.end.line === node.loc.start.line) {
                        numLinesComments--;
                    }
                });
                return numLinesComments;
            }