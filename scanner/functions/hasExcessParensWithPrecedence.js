function hasExcessParensWithPrecedence(node, precedenceLowerLimit) {
                if (ruleApplies(node) && isParenthesised(node)) {
                    if (precedence(node) >= precedenceLowerLimit ||
                        isParenthesisedTwice(node)) {
                        return true;
                    }
                }
                return false;
            }