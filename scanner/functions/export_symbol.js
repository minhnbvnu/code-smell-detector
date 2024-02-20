function export_symbol(sym) {
            if (!(sym instanceof AST_SymbolDeclaration)) return;
            var node = make_node(AST_SymbolExport, sym, sym);
            node.alias = node.name;
            props.push(node);
        }