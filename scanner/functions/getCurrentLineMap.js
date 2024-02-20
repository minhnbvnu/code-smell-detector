function getCurrentLineMap() {
                return currentLineMap || (currentLineMap = getLineStarts(Debug.checkDefined(currentSourceFile)));
            }