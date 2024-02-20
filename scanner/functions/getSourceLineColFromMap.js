function getSourceLineColFromMap(lineCol, minChar, lineMap) {
        var line = getLineNumberFromPosition(lineMap, minChar);
        if(line > 0) {
            lineCol.line = line;
            lineCol.col = (minChar - lineMap[line]);
        }
    }