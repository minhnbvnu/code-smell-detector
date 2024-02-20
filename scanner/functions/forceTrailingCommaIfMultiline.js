function forceTrailingCommaIfMultiline(node) {
                if (isMultiline(node)) {
                    forceTrailingComma(node);
                }
                else {
                    forbidTrailingComma(node);
                }
            }