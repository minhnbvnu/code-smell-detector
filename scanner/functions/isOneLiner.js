function isOneLiner(node) {
                if (node.type === "EmptyStatement") {
                    return true;
                }
                const first = sourceCode.getFirstToken(node);
                const last = sourceCode.getLastToken(node);
                const lastExcludingSemicolon = astUtils.isSemicolonToken(last) ? sourceCode.getTokenBefore(last) : last;
                return first.loc.start.line === lastExcludingSemicolon.loc.end.line;
            }