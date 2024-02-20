function allowTrailingCommaIfMultiline(node) {
                if (!isMultiline(node)) {
                    forbidTrailingComma(node);
                }
            }