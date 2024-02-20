function removeInvalidNodeErrorsInIdentifierOrLiteral(node) {
                const shouldCheckStrings = skipStrings && (typeof node.value === "string");
                const shouldCheckRegExps = skipRegExps && Boolean(node.regex);
                if (shouldCheckStrings || shouldCheckRegExps) {
                    // If we have irregular characters remove them from the errors list
                    if (ALL_IRREGULARS.test(node.raw)) {
                        removeWhitespaceError(node);
                    }
                }
            }