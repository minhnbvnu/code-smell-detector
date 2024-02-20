function flushLabel() {
                if (!statements) {
                    return;
                }
                appendLabel(
                /*markLabelEnd*/
                !lastOperationWasAbrupt);
                lastOperationWasAbrupt = false;
                lastOperationWasCompletion = false;
                labelNumber++;
            }