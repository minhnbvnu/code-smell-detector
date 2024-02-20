function addOutliningForLeadingCommentsForPos(pos, sourceFile, cancellationToken, out) {
            const comments = getLeadingCommentRanges(sourceFile.text, pos);
            if (!comments)
                return;
            let firstSingleLineCommentStart = -1;
            let lastSingleLineCommentEnd = -1;
            let singleLineCommentCount = 0;
            const sourceText = sourceFile.getFullText();
            for (const { kind, pos: pos2, end } of comments) {
                cancellationToken.throwIfCancellationRequested();
                switch (kind) {
                    case 2 /* SingleLineCommentTrivia */:
                        const commentText = sourceText.slice(pos2, end);
                        if (isRegionDelimiter(commentText)) {
                            combineAndAddMultipleSingleLineComments();
                            singleLineCommentCount = 0;
                            break;
                        }
                        if (singleLineCommentCount === 0) {
                            firstSingleLineCommentStart = pos2;
                        }
                        lastSingleLineCommentEnd = end;
                        singleLineCommentCount++;
                        break;
                    case 3 /* MultiLineCommentTrivia */:
                        combineAndAddMultipleSingleLineComments();
                        out.push(createOutliningSpanFromBounds(pos2, end, "comment" /* Comment */));
                        singleLineCommentCount = 0;
                        break;
                    default:
                        Debug.assertNever(kind);
                }
            }
            combineAndAddMultipleSingleLineComments();
            function combineAndAddMultipleSingleLineComments() {
                if (singleLineCommentCount > 1) {
                    out.push(createOutliningSpanFromBounds(firstSingleLineCommentStart, lastSingleLineCommentEnd, "comment" /* Comment */));
                }
            }
        }