function classifyDisabledMergeCode(text, start, end) {
                let i;
                for (i = start; i < end; i++) {
                    if (isLineBreak(text.charCodeAt(i))) {
                        break;
                    }
                }
                pushClassification(start, i - start, 1 /* comment */);
                mergeConflictScanner.setTextPos(i);
                while (mergeConflictScanner.getTextPos() < end) {
                    classifyDisabledCodeToken();
                }
            }