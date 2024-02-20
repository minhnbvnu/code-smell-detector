function removeInvalidNodeErrorsInComment(node) {
                if (ALL_IRREGULARS.test(node.value)) {
                    removeWhitespaceError(node);
                }
            }