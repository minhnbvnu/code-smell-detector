function emitConditionalExpression(node) {
                const linesBeforeQuestion = getLinesBetweenNodes(node, node.condition, node.questionToken);
                const linesAfterQuestion = getLinesBetweenNodes(node, node.questionToken, node.whenTrue);
                const linesBeforeColon = getLinesBetweenNodes(node, node.whenTrue, node.colonToken);
                const linesAfterColon = getLinesBetweenNodes(node, node.colonToken, node.whenFalse);
                emitExpression(node.condition, parenthesizer.parenthesizeConditionOfConditionalExpression);
                writeLinesAndIndent(linesBeforeQuestion, 
                /*writeSpaceIfNotIndenting*/
                true);
                emit(node.questionToken);
                writeLinesAndIndent(linesAfterQuestion, 
                /*writeSpaceIfNotIndenting*/
                true);
                emitExpression(node.whenTrue, parenthesizer.parenthesizeBranchOfConditionalExpression);
                decreaseIndentIf(linesBeforeQuestion, linesAfterQuestion);
                writeLinesAndIndent(linesBeforeColon, 
                /*writeSpaceIfNotIndenting*/
                true);
                emit(node.colonToken);
                writeLinesAndIndent(linesAfterColon, 
                /*writeSpaceIfNotIndenting*/
                true);
                emitExpression(node.whenFalse, parenthesizer.parenthesizeBranchOfConditionalExpression);
                decreaseIndentIf(linesBeforeColon, linesAfterColon);
            }