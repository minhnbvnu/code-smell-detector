function isInternalDeclaration(node, currentSourceFile) {
            const parseTreeNode = getParseTreeNode(node);
            if (parseTreeNode && parseTreeNode.kind === 166 /* Parameter */) {
                const paramIdx = parseTreeNode.parent.parameters.indexOf(parseTreeNode);
                const previousSibling = paramIdx > 0 ? parseTreeNode.parent.parameters[paramIdx - 1] : void 0;
                const text = currentSourceFile.text;
                const commentRanges = previousSibling ? concatenate(
                // to handle
                // ... parameters, /** @internal */
                // public param: string
                getTrailingCommentRanges(text, skipTrivia(text, previousSibling.end + 1, 
                /* stopAfterLineBreak */
                false, 
                /* stopAtComments */
                true)), getLeadingCommentRanges(text, node.pos)) : getTrailingCommentRanges(text, skipTrivia(text, node.pos, 
                /* stopAfterLineBreak */
                false, 
                /* stopAtComments */
                true));
                return commentRanges && commentRanges.length && hasInternalAnnotation(last(commentRanges), currentSourceFile);
            }
            const leadingCommentRanges = parseTreeNode && getLeadingCommentRangesOfNode(parseTreeNode, currentSourceFile);
            return !!forEach(leadingCommentRanges, (range) => {
                return hasInternalAnnotation(range, currentSourceFile);
            });
        }