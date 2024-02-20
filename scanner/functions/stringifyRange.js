function stringifyRange(r) {
    return r.start.row + ":" + r.start.column 
        + "=>" + r.end.row + ":" + r.end.column;
}