function getPositionFromLineColumn(script, line, column) {
        return script.locationInfo.lineMap[line] + (column - 1);
    }