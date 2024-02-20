function processComment(comment) {
                const options = normalizedOptions[comment.type], commentValid = isCommentValid(comment, options);
                if (!commentValid) {
                    const messageId = capitalize === "always"
                        ? "unexpectedLowercaseComment"
                        : "unexpectedUppercaseComment";
                    context.report({
                        node: null,
                        loc: comment.loc,
                        messageId,
                        fix(fixer) {
                            const match = comment.value.match(LETTER_PATTERN);
                            return fixer.replaceTextRange(
                            // Offset match.index by 2 to account for the first 2 characters that start the comment (// or /*)
                            [comment.range[0] + match.index + 2, comment.range[0] + match.index + 3], capitalize === "always" ? match[0].toLocaleUpperCase() : match[0].toLocaleLowerCase());
                        }
                    });
                }
            }