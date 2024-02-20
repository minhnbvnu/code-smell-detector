function allowCommaIfMultiline(node) {
                if (!isMultiline(node)) {
                    forbidComma(node);
                }
            }