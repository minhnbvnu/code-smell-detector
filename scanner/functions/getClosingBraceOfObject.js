function getClosingBraceOfObject(node) {
                const lastProperty = node.members[node.members.length - 1];
                return sourceCode.getTokenAfter(lastProperty, util_1.isClosingBraceToken);
            }