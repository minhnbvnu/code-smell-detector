function onOperator(operatorToken, _state, node) {
                    const isCommaOperator = operatorToken.kind !== 27 /* CommaToken */;
                    const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
                    const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
                    writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
                    emitLeadingCommentsOfPosition(operatorToken.pos);
                    writeTokenNode(operatorToken, operatorToken.kind === 101 /* InKeyword */ ? writeKeyword : writeOperator);
                    emitTrailingCommentsOfPosition(operatorToken.end, 
                    /*prefixSpace*/
                    true);
                    writeLinesAndIndent(linesAfterOperator, 
                    /*writeSpaceIfNotIndenting*/
                    true);
                }