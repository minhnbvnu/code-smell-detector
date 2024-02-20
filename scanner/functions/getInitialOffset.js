function getInitialOffset(comment) {
                return sourceCode.text.slice(comment.range[0] - comment.loc.start.column, comment.range[0]);
            }