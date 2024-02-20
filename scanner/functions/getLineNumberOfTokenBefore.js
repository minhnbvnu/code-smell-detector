function getLineNumberOfTokenBefore(node) {
                const tokenBefore = sourceCode.getTokenBefore(node);
                let lineNumTokenBefore;
                /**
                 * Global return (at the beginning of a script) is a special case.
                 * If there is no token before `return`, then we expect no line
                 * break before the return. Comments are allowed to occupy lines
                 * before the global return, just no blank lines.
                 * Setting lineNumTokenBefore to zero in that case results in the
                 * desired behavior.
                 */
                if (tokenBefore) {
                    lineNumTokenBefore = tokenBefore.loc.end.line;
                }
                else {
                    lineNumTokenBefore = 0; // global return at beginning of script
                }
                return lineNumTokenBefore;
            }