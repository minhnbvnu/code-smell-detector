function getEndPositionOfMultilineTrailingComment(sourceFile, node, options) {
            const { end } = node;
            const { trailingTriviaOption } = options;
            if (trailingTriviaOption === 2 /* Include */) {
                const comments = getTrailingCommentRanges(sourceFile.text, end);
                if (comments) {
                    const nodeEndLine = getLineOfLocalPosition(sourceFile, node.end);
                    for (const comment of comments) {
                        if (comment.kind === 2 /* SingleLineCommentTrivia */ || getLineOfLocalPosition(sourceFile, comment.pos) > nodeEndLine) {
                            break;
                        }
                        const commentEndLine = getLineOfLocalPosition(sourceFile, comment.end);
                        if (commentEndLine > nodeEndLine) {
                            return skipTrivia(sourceFile.text, comment.end, 
                            /*stopAfterLineBreak*/
                            true, 
                            /*stopAtComments*/
                            true);
                        }
                    }
                }
            }
            return void 0;
        }