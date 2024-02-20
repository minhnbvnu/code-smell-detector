function mapEvalOrigin(origin) {
        // Most eval() calls are in this format
        var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
        if (match) {
            var position = mapSourcePosition({
                source: match[2],
                line: +match[3],
                column: match[4] - 1
            });
            return 'eval at ' + match[1] + ' (' + position.source + ':' +
                position.line + ':' + (position.column + 1) + ')';
        }
        // Parse nested eval() calls using recursion
        match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
        if (match) {
            return 'eval at ' + match[1] + ' (' + mapEvalOrigin(match[2]) + ')';
        }
        // Make sure we still return useful information if we didn't find anything
        return origin;
    }