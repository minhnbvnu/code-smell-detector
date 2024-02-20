function getLastBlockToken(token) {
                let last = token, next;
                do {
                    next = last;
                    last = sourceCode.getTokenBefore(last, { includeComments: true });
                } while (isComment(last) && last.loc.end.line === next.loc.start.line);
                return last;
            }