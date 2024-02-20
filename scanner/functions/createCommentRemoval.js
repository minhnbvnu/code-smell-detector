function createCommentRemoval(directives, commentToken) {
        const { range } = commentToken;
        const ruleIds = directives.filter(directive => directive.ruleId).map(directive => `'${directive.ruleId}'`);
        return {
            description: ruleIds.length <= 2
                ? ruleIds.join(" or ")
                : `${ruleIds.slice(0, ruleIds.length - 1).join(", ")}, or ${ruleIds[ruleIds.length - 1]}`,
            fix: {
                range,
                text: " "
            },
            unprocessedDirective: directives[0].unprocessedDirective
        };
    }