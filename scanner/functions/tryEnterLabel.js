function tryEnterLabel(operationIndex) {
                if (!labelOffsets) {
                    return;
                }
                for (let label = 0; label < labelOffsets.length; label++) {
                    if (labelOffsets[label] === operationIndex) {
                        flushLabel();
                        if (labelNumbers === void 0) {
                            labelNumbers = [];
                        }
                        if (labelNumbers[labelNumber] === void 0) {
                            labelNumbers[labelNumber] = [label];
                        }
                        else {
                            labelNumbers[labelNumber].push(label);
                        }
                    }
                }
            }