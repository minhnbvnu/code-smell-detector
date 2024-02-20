function checkForImport(node) {
                if (node.specifiers.length === 0) {
                    return;
                }
                let firstSpecifier = node.specifiers[0];
                const lastSpecifier = node.specifiers[node.specifiers.length - 1];
                if (lastSpecifier.type !== "ImportSpecifier") {
                    return;
                }
                if (firstSpecifier.type !== "ImportSpecifier") {
                    firstSpecifier = node.specifiers[1];
                }
                const first = sourceCode.getTokenBefore(firstSpecifier), last = sourceCode.getTokenAfter(lastSpecifier, astUtils.isNotCommaToken), second = sourceCode.getTokenAfter(first, { includeComments: true }), penultimate = sourceCode.getTokenBefore(last, { includeComments: true });
                validateBraceSpacing(node, first, second, penultimate, last);
            }