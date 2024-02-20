function reset_def(compressor, def) {
            def.assignments = 0;
            def.chained = false;
            def.direct_access = false;
            def.escaped = 0;
            def.recursive_refs = 0;
            def.references = [];
            def.single_use = undefined;
            if (def.scope.pinned()
                || (def.orig[0] instanceof AST_SymbolFunarg && def.scope.uses_arguments)) {
                def.fixed = false;
            }
            else if (def.orig[0] instanceof AST_SymbolConst || !compressor.exposed(def)) {
                def.fixed = def.init;
            }
            else {
                def.fixed = false;
            }
        }