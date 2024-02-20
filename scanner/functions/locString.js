function locString(loc) {
    return [
        loc.start.line,
        loc.start.column,
        loc.end.line,
        loc.end.column
    ].join(':');
}