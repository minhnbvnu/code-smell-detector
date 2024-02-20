function processUnusedDisableDirectives(allDirectives) {
        const directiveGroups = groupByParentComment(allDirectives);
        return directiveGroups.flatMap(directives => {
            const { parentComment } = directives[0].unprocessedDirective;
            const remainingRuleIds = new Set(parentComment.ruleIds);
            for (const directive of directives) {
                remainingRuleIds.delete(directive.ruleId);
            }
            return remainingRuleIds.size
                ? createIndividualDirectivesRemoval(directives, parentComment.commentToken)
                : [createCommentRemoval(directives, parentComment.commentToken)];
        });
    }