function stripTrailingComment(line, comment) {
                // loc.column is zero-indexed
                return line.slice(0, comment.loc.start.column).replace(/\s+$/u, "");
            }