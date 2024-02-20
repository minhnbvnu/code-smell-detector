function trim_optional_chain(node, compressor) {
        if (!compressor.option("optional_chains")) return;
        if (node.terminal) do {
            var expr = node.expression;
            if (node.optional) {
                var ev = fuzzy_eval(compressor, expr, true);
                if (ev == null) return make_node(AST_UnaryPrefix, node, {
                    operator: "void",
                    expression: expr,
                }).optimize(compressor);
                if (!(ev instanceof AST_Node)) node.optional = false;
            }
            node = expr;
        } while ((node.TYPE == "Call" || node instanceof AST_PropAccess) && !node.terminal);
    }