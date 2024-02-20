function init_block_vars(scope, parent) {
    scope.enclosed = [];                            // variables from this or outer scope(s) that are referenced from this or inner scopes
    scope.parent_scope = parent;                    // the parent scope (null if this is the top level)
    scope.functions = new Dictionary();             // map name to AST_SymbolDefun (functions defined in this scope)
    scope.variables = new Dictionary();             // map name to AST_SymbolVar (variables defined in this scope; includes functions)
    if (parent) scope.make_def = parent.make_def;   // top-level tracking of SymbolDef instances
}