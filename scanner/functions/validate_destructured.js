function validate_destructured(node, check, allow_default) {
    if (node instanceof AST_DefaultValue && allow_default) return validate_destructured(node.name, check);
    if (node instanceof AST_Destructured) {
        if (node.rest != null) validate_destructured(node.rest, check);
        if (node instanceof AST_DestructuredArray) return node.elements.forEach(function(node) {
            if (!(node instanceof AST_Hole)) validate_destructured(node, check, true);
        });
        if (node instanceof AST_DestructuredObject) return node.properties.forEach(function(prop) {
            validate_destructured(prop.value, check, true);
        });
    }
    check(node);
}