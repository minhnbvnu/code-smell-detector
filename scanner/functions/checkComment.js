function checkComment(node) {
                const comment = node.value;
                if (astUtils.isDirectiveComment(node) &&
                    selfConfigRegEx.test(comment)) {
                    return;
                }
                const matches = commentContainsWarningTerm(comment);
                matches.forEach(matchedTerm => {
                    let commentToDisplay = "";
                    let truncated = false;
                    for (const c of comment.trim().split(/\s+/u)) {
                        const tmp = commentToDisplay ? `${commentToDisplay} ${c}` : c;
                        if (tmp.length <= CHAR_LIMIT) {
                            commentToDisplay = tmp;
                        }
                        else {
                            truncated = true;
                            break;
                        }
                    }
                    context.report({
                        node,
                        messageId: "unexpectedComment",
                        data: {
                            matchedTerm,
                            comment: `${commentToDisplay}${truncated ? "..." : ""}`
                        }
                    });
                });
            }