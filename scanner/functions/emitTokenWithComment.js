function emitTokenWithComment(token, pos, writer2, contextNode, indentLeading) {
                const node = getParseTreeNode(contextNode);
                const isSimilarNode = node && node.kind === contextNode.kind;
                const startPos = pos;
                if (isSimilarNode && currentSourceFile) {
                    pos = skipTrivia(currentSourceFile.text, pos);
                }
                if (isSimilarNode && contextNode.pos !== startPos) {
                    const needsIndent = indentLeading && currentSourceFile && !positionsAreOnSameLine(startPos, pos, currentSourceFile);
                    if (needsIndent) {
                        increaseIndent();
                    }
                    emitLeadingCommentsOfPosition(startPos);
                    if (needsIndent) {
                        decreaseIndent();
                    }
                }
                pos = writeTokenText(token, writer2, pos);
                if (isSimilarNode && contextNode.end !== pos) {
                    const isJsxExprContext = contextNode.kind === 291 /* JsxExpression */;
                    emitTrailingCommentsOfPosition(pos, 
                    /*prefixSpace*/
                    !isJsxExprContext, 
                    /*forceNoNewline*/
                    isJsxExprContext);
                }
                return pos;
            }