function insertIntoBody(lhs, rhs, body) {
    var assign = body.synth({
        type: ASSIGN,
        children: [lhs, rhs],
        blockComment: null
    });
    var stmt = body.synth({
        type: SEMICOLON,
        blockComments: [],
        expression: assign
    });
    if (body.type !== BLOCK) {
        body = body.synth({
            type: BLOCK,
            value: "{",
            children: [body],
            varDecls: [],
            // FIXME: this is probably wrong if body has label
            labels: new Dict()
        });
    }
    body.children.unshift(stmt);
    return body;
}