function checkForObject(node) {
                if (node.properties.length === 0) {
                    return;
                }
                const first = sourceCode.getFirstToken(node), last = getClosingBraceOfObject(node), second = sourceCode.getTokenAfter(first, { includeComments: true }), penultimate = sourceCode.getTokenBefore(last, { includeComments: true });
                validateBraceSpacing(node, first, second, penultimate, last);
            }