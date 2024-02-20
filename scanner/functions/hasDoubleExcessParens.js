function hasDoubleExcessParens(node) {
                return ruleApplies(node) && isParenthesisedTwice(node);
            }