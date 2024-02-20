function isCollapsedOneLiner(node) {
                const before = sourceCode.getTokenBefore(node);
                const last = sourceCode.getLastToken(node);
                const lastExcludingSemicolon = astUtils.isSemicolonToken(last) ? sourceCode.getTokenBefore(last) : last;
                return before.loc.start.line === lastExcludingSemicolon.loc.end.line;
            }