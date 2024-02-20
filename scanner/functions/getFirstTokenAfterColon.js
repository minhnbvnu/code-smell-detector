function getFirstTokenAfterColon(node) {
                const colonToken = getNextColon(node);
                return sourceCode.getTokenAfter(colonToken);
            }