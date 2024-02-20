function getEmitListItem(emit, parenthesizerRule) {
            return emit.length === 1 ? emitListItemNoParenthesizer : typeof parenthesizerRule === "object" ? emitListItemWithParenthesizerRuleSelector : emitListItemWithParenthesizerRule;
        }