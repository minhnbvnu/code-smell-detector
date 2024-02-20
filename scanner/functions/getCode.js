function getCode(sources, frame) {
    var codeArr = sources[frame.filename];
    if (!codeArr || codeArr.length < frame.line) return '';

    var code = codeArr[frame.line - 1];

    // IE<=8 has no trim :(
    code = (code.trim && code.trim()) || code;
    if (!code.length) return '';

    // hljs is pretty bad at guessing the language
    var ext = frame.filename.slice(-3);

    var highlight_fn = hljs.highlightAuto;
    if (ext === '.js') {
        highlight_fn = function(src) {
            return hljs.highlight('javascript', src)
        }
    }

    try {
        return highlight_fn(code).value;
    } catch (e) {
        return code;
    }
}