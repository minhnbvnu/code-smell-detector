function mark_assignment_to_arguments(node) {
            if (!(node instanceof AST_Sub)) return;
            var expr = node.expression;
            if (!(expr instanceof AST_SymbolRef)) return;
            var def = expr.definition();
            if (!is_arguments(def)) return;
            var key = node.property;
            if (key.is_constant()) key = key.value;
            if (!(key instanceof AST_Node) && !RE_POSITIVE_INTEGER.test(key)) return;
            def.reassigned++;
            (key instanceof AST_Node ? def.scope.argnames : [ def.scope.argnames[key] ]).forEach(function(argname) {
                if (argname instanceof AST_SymbolFunarg) argname.definition().fixed = false;
            });
        }