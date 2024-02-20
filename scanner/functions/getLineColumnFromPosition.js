function getLineColumnFromPosition(script, position) {
        var result = {
            line: -1,
            col: -1
        };
        getSourceLineColFromMap(result, position, script.locationInfo.lineMap);
        if(result.col >= 0) {
            result.col++;
        }
        return result;
    }