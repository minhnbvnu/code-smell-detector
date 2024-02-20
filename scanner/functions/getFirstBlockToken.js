function getFirstBlockToken(token) {
                let prev, first = token;
                do {
                    prev = first;
                    first = sourceCode.getTokenAfter(first, { includeComments: true });
                } while (isComment(first) && first.loc.start.line === prev.loc.end.line);
                return first;
            }