function plainString (mapped) {
    var str = '';
    for (var i = 0; i <mapped.length; ++i) {
        var frame = mapped[i];
        str += '\n\tat ';
        str += frame.func + ' (' + frame.filename + ':' + frame.line + ':';
        str += (frame.column || 0) + ')';
    }
}