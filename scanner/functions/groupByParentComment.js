function groupByParentComment(directives) {
        const groups = new Map();
        for (const directive of directives) {
            const { unprocessedDirective: { parentComment } } = directive;
            if (groups.has(parentComment)) {
                groups.get(parentComment).push(directive);
            }
            else {
                groups.set(parentComment, [directive]);
            }
        }
        return [...groups.values()];
    }