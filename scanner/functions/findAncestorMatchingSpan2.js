function findAncestorMatchingSpan2(sourceFile, span) {
            let token = getTokenAtPosition(sourceFile, span.start);
            const end = textSpanEnd(span);
            while (token.end < end) {
                token = token.parent;
            }
            return token;
        }