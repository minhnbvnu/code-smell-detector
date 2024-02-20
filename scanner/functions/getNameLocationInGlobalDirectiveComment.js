function getNameLocationInGlobalDirectiveComment(sourceCode, comment, name) {
        const namePattern = new RegExp(`[\\s,]${(0, escapeRegExp_1.escapeRegExp)(name)}(?:$|[\\s,:])`, 'gu');
        // To ignore the first text "global".
        namePattern.lastIndex = comment.value.indexOf('global') + 6;
        // Search a given variable name.
        const match = namePattern.exec(comment.value);
        // Convert the index to loc.
        const start = sourceCode.getLocFromIndex(comment.range[0] + '/*'.length + (match ? match.index + 1 : 0));
        const end = {
            line: start.line,
            column: start.column + (match ? name.length : 1),
        };
        return { start, end };
    }