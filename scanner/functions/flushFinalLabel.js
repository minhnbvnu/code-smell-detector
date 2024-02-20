function flushFinalLabel(operationIndex) {
                if (isFinalLabelReachable(operationIndex)) {
                    tryEnterLabel(operationIndex);
                    withBlockStack = void 0;
                    writeReturn(
                    /*expression*/
                    void 0, 
                    /*operationLocation*/
                    void 0);
                }
                if (statements && clauses) {
                    appendLabel(
                    /*markLabelEnd*/
                    false);
                }
                updateLabelExpressions();
            }