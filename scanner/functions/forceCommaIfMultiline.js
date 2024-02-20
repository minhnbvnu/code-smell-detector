function forceCommaIfMultiline(node) {
                if (isMultiline(node)) {
                    forceComma(node);
                }
                else {
                    forbidComma(node);
                }
            }