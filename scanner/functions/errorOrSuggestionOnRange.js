function errorOrSuggestionOnRange(isError, startNode2, endNode2, message) {
                addErrorOrSuggestionDiagnostic(isError, { pos: getTokenPosOfNode(startNode2, file), end: endNode2.end }, message);
            }