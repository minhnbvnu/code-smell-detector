function findAncestorMatchingSpan(sourceFile, span) {
            const end = textSpanEnd(span);
            let token = getTokenAtPosition(sourceFile, span.start);
            while (token.end < end) {
                token = token.parent;
            }
            return token;
        }