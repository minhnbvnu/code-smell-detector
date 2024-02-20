function getPropertyRange(node) {
                const dotOrOpenBracket = sourceCode.getTokenAfter(node.object, util_1.isNotClosingParenToken);
                return [dotOrOpenBracket.range[0], node.range[1]];
            }