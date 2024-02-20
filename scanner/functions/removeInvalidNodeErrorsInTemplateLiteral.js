function removeInvalidNodeErrorsInTemplateLiteral(node) {
                if (typeof node.value.raw === "string") {
                    if (ALL_IRREGULARS.test(node.value.raw)) {
                        removeWhitespaceError(node);
                    }
                }
            }