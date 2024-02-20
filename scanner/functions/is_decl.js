function is_decl(node) {
            return (node instanceof AST_DefaultValue ? node.name : node) instanceof AST_SymbolDeclaration;
        }