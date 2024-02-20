function getCompletionPrefix(editor) {
    var pos = editor.getCursorPosition();
    var line = editor.session.getLine(pos.row);
    var prefix;
    editor.completers.forEach(function(completer) {
        if (completer.identifierRegexps) {
            completer.identifierRegexps.forEach(function(identifierRegex) {
                if (!prefix && identifierRegex)
                    prefix = util.retrievePrecedingIdentifier(line, pos.column, identifierRegex);
            });
        }
    });
    return prefix || util.retrievePrecedingIdentifier(line, pos.column);
}