function debug_watch(location, expression, value) {
    // The value must be unparsed immediately, since it can be mutated
    // after this function returns.

    // Pretty-print the value (hint = expression, specialStructs = true)
    const html = QRuntime.$unparse(value, new Map(), ': ', false, true, false, '', expression, true);

    debugWatchTable[location.url + ':' + location.line_number] = {
        location: location,
        expression: expression,
        value: html,
        game_frames: QRuntime.game_frames
    };
    
    debugWatchTable.changed = true;
}