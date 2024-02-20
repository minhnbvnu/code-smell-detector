function isFinalLabelReachable(operationIndex) {
                if (!lastOperationWasCompletion) {
                    return true;
                }
                if (!labelOffsets || !labelExpressions) {
                    return false;
                }
                for (let label = 0; label < labelOffsets.length; label++) {
                    if (labelOffsets[label] === operationIndex && labelExpressions[label]) {
                        return true;
                    }
                }
                return false;
            }