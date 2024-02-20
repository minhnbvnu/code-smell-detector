function is_lexical_definition(stat) {
        return stat instanceof AST_Const || stat instanceof AST_DefClass || stat instanceof AST_Let;
    }