function desugarObjectAssignment(lhs, tmp) {
    var elts =
        lhs.children.map(function(init) {
            var propName, patt;
            if (init.type === IDENTIFIER) {
                propName = patt = id(init, init.value);
            } else {
                propName = init.children[0];
                patt = init.children[1];
            }
            var path = lhs.synth({
                type: INDEX,
                value: "[",
                children: [tmp, lhs.synth({ type: STRING, value: String(propName.value) })]
            });
            return desugarAssignment(lhs.synth({
                type: ASSIGN,
                children: [patt, path],
                blockComment: null
            }));
        });
    return list(lhs, elts);
}