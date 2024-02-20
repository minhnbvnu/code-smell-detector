function get_init_symbol(for_in) {
            var init = for_in.init;
            if (init instanceof AST_Definitions) {
                init = init.definitions[0].name;
                return init instanceof AST_SymbolDeclaration && init;
            }
            while (init instanceof AST_PropAccess) init = init.expression.tail_node();
            if (init instanceof AST_SymbolRef) return init;
        }