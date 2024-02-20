function checkAndReportAssignmentSpace(leftNode, rightNode) {
                if (!rightNode || !leftNode) {
                    return;
                }
                const operator = sourceCode.getFirstTokenBetween(leftNode, rightNode, isSpaceChar);
                const prev = sourceCode.getTokenBefore(operator);
                const next = sourceCode.getTokenAfter(operator);
                if (!sourceCode.isSpaceBetween(prev, operator) ||
                    !sourceCode.isSpaceBetween(operator, next)) {
                    report(operator);
                }
            }