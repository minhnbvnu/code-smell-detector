function checkDirectives(node) {
                const directives = astUtils.getDirectivePrologue(node);
                if (!directives.length) {
                    return;
                }
                const firstDirective = directives[0];
                const leadingComments = sourceCode.getCommentsBefore(firstDirective);
                /*
                 * Only check before the first directive if it is preceded by a comment or if it is at the top of
                 * the file and expectLineBefore is set to "never". This is to not force a newline at the top of
                 * the file if there are no comments as well as for compatibility with padded-blocks.
                 */
                if (leadingComments.length) {
                    if (expectLineBefore === "always" && !hasNewlineBefore(firstDirective)) {
                        reportError(firstDirective, "before", true);
                    }
                    if (expectLineBefore === "never" && hasNewlineBefore(firstDirective)) {
                        reportError(firstDirective, "before", false);
                    }
                }
                else if (node.type === "Program" &&
                    expectLineBefore === "never" &&
                    !leadingComments.length &&
                    hasNewlineBefore(firstDirective)) {
                    reportError(firstDirective, "before", false);
                }
                const lastDirective = directives[directives.length - 1];
                const statements = node.type === "Program" ? node.body : node.body.body;
                /*
                 * Do not check after the last directive if the body only
                 * contains a directive prologue and isn't followed by a comment to ensure
                 * this rule behaves well with padded-blocks.
                 */
                if (lastDirective === statements[statements.length - 1] && !lastDirective.trailingComments) {
                    return;
                }
                if (expectLineAfter === "always" && !hasNewlineAfter(lastDirective)) {
                    reportError(lastDirective, "after", true);
                }
                if (expectLineAfter === "never" && hasNewlineAfter(lastDirective)) {
                    reportError(lastDirective, "after", false);
                }
            }