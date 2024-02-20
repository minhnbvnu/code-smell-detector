function combineAndAddMultipleSingleLineComments() {
                if (singleLineCommentCount > 1) {
                    out.push(createOutliningSpanFromBounds(firstSingleLineCommentStart, lastSingleLineCommentEnd, "comment" /* Comment */));
                }
            }