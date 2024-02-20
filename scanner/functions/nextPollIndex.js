function nextPollIndex() {
                pollIndex++;
                if (pollIndex === queue.length) {
                    if (definedValueCopyToIndex < pollIndex) {
                        queue.length = definedValueCopyToIndex;
                    }
                    pollIndex = 0;
                    definedValueCopyToIndex = 0;
                }
            }