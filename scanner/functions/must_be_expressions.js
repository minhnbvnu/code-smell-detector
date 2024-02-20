function must_be_expressions(node, prop, allow_spread, allow_hole) {
    node[prop].forEach(function(node) {
        validate_expression(node, prop, true, allow_spread, allow_hole);
    });
}