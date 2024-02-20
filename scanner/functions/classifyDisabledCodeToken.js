function classifyDisabledCodeToken() {
                const start = mergeConflictScanner.getTextPos();
                const tokenKind = mergeConflictScanner.scan();
                const end = mergeConflictScanner.getTextPos();
                const type = classifyTokenType(tokenKind);
                if (type) {
                    pushClassification(start, end - start, type);
                }
            }