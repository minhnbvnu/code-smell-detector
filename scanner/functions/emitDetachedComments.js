function emitDetachedComments(text, lineMap, writer, writeComment, node, newLine, removeComments) {
            let leadingComments;
            let currentDetachedCommentInfo;
            if (removeComments) {
                if (node.pos === 0) {
                    leadingComments = filter(getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
                }
            }
            else {
                leadingComments = getLeadingCommentRanges(text, node.pos);
            }
            if (leadingComments) {
                const detachedComments = [];
                let lastComment;
                for (const comment of leadingComments) {
                    if (lastComment) {
                        const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastComment.end);
                        const commentLine = getLineOfLocalPositionFromLineMap(lineMap, comment.pos);
                        if (commentLine >= lastCommentLine + 2) {
                            break;
                        }
                    }
                    detachedComments.push(comment);
                    lastComment = comment;
                }
                if (detachedComments.length) {
                    const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, last(detachedComments).end);
                    const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, skipTrivia(text, node.pos));
                    if (nodeLine >= lastCommentLine + 2) {
                        emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                        emitComments(text, lineMap, writer, detachedComments, 
                        /*leadingSeparator*/
                        false, 
                        /*trailingSeparator*/
                        true, newLine, writeComment);
                        currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: last(detachedComments).end };
                    }
                }
            }
            return currentDetachedCommentInfo;
            function isPinnedCommentLocal(comment) {
                return isPinnedComment(text, comment.pos);
            }
        }