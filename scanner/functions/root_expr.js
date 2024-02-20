function root_expr(prop) {
    while (prop instanceof AST_PropAccess) prop = prop.expression;
    return prop;
}