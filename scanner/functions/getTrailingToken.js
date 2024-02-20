function getTrailingToken(node) {
                const last = getLastItem(node);
                const trailing = last && sourceCode.getTokenAfter(last);
                return trailing;
            }