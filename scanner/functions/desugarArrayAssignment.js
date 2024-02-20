function desugarArrayAssignment(lhs, tmp) {
    var elts = [];
    lhs.children.forEach(function(patt, i) {
        if (!patt)
            return;
        var path = lhs.synth({
            type: INDEX,
            value: "[",
            children: [tmp, lhs.synth({ type: NUMBER, value: i })]
        });
        elts.push(desugarAssignment(lhs.synth({
            type: ASSIGN,
            children: [patt, path],
            blockComment: null
        })));
    });
    return elts.length > 0
        ? list(lhs, elts)
        : lhs.synth({ type: NULL, value: "null" });
}