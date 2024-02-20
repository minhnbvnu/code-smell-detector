function getCommentLineNums(comments) {
        const lines = [];
        comments.forEach(token => {
            const start = token.loc.start.line;
            const end = token.loc.end.line;
            lines.push(start, end);
        });
        return lines;
    }