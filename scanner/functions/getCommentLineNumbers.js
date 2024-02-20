function getCommentLineNumbers(comments) {
                const lines = new Set();
                comments.forEach(comment => {
                    const endLine = comment.type === "Block"
                        ? comment.loc.end.line - 1
                        : comment.loc.end.line;
                    for (let i = comment.loc.start.line; i <= endLine; i++) {
                        lines.add(i);
                    }
                });
                return lines;
            }