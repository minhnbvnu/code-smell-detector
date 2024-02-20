function emitListItemWithParenthesizerRuleSelector(node, emit, parenthesizerRuleSelector, index) {
            emit(node, parenthesizerRuleSelector.select(index));
        }