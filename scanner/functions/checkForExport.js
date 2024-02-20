function checkForExport(node) {
                if (node.specifiers.length === 0) {
                    return;
                }
                const firstSpecifier = node.specifiers[0], lastSpecifier = node.specifiers[node.specifiers.length - 1], first = sourceCode.getTokenBefore(firstSpecifier), last = sourceCode.getTokenAfter(lastSpecifier, astUtils.isNotCommaToken), second = sourceCode.getTokenAfter(first, { includeComments: true }), penultimate = sourceCode.getTokenBefore(last, { includeComments: true });
                validateBraceSpacing(node, first, second, penultimate, last);
            }