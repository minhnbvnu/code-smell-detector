function is_declaration(stat, lexical) {
        if (stat instanceof AST_DefClass) return lexical && !stat.extends && all(stat.properties, function(prop) {
            if (prop.key instanceof AST_Node) return false;
            if (prop instanceof AST_ClassField && prop.static && prop.value) return false;
            return true;
        });
        if (stat instanceof AST_Definitions) return (lexical || stat instanceof AST_Var) && declarations_only(stat);
        if (stat instanceof AST_ExportDeclaration) return is_declaration(stat.body, lexical);
        if (stat instanceof AST_ExportDefault) return is_declaration(stat.body, lexical);
        return stat instanceof AST_LambdaDefinition;
    }