function validate_expression(value, prop, multiple, allow_spread, allow_hole) {
    multiple = multiple ? "contain" : "be";
    if (!(value instanceof AST_Node)) throw new Error(prop + " must " + multiple + " AST_Node");
    if (value instanceof AST_DefaultValue) throw new Error(prop + " cannot " + multiple + " AST_DefaultValue");
    if (value instanceof AST_Destructured) throw new Error(prop + " cannot " + multiple + " AST_Destructured");
    if (value instanceof AST_Hole && !allow_hole) throw new Error(prop + " cannot " + multiple + " AST_Hole");
    if (value instanceof AST_Spread && !allow_spread) throw new Error(prop + " cannot " + multiple + " AST_Spread");
    if (is_statement(value)) throw new Error(prop + " cannot " + multiple + " AST_Statement");
    if (value instanceof AST_SymbolDeclaration) {
        throw new Error(prop + " cannot " + multiple + " AST_SymbolDeclaration");
    }
}