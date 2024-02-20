function withTemp(expr, makeBody) {
    if (expr.type === IDENTIFIER)
        return makeBody(expr);

    var name = generateTemp(expr);
    var body = makeBody(name);
    var binding = expr.synth({
        type: IDENTIFIER,
        value: name.value,
        name: name.value,
        readOnly: false,
        initializer: expr,
        blockComment: null
    });
    return expr.synth({
        type: LET_BLOCK,
        varDecls: [binding],
        variables: expr.synth({
            type: LET,
            value: "(",
            children: [binding],
            destructurings: []
        }),
        expression: body,
        parenthesized: true
    });
}