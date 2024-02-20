function all_refs_local(scope) {
                let result = true;
                walk(this, node => {
                    if (node instanceof AST_SymbolRef) {
                        if (has_flag(this, INLINED)) {
                            result = false;
                            return walk_abort;
                        }
                        var def = node.definition();
                        if (member(def, this.enclosed)
                            && !this.variables.has(def.name)) {
                            if (scope) {
                                var scope_def = scope.find_variable(node);
                                if (def.undeclared ? !scope_def : scope_def === def) {
                                    result = "f";
                                    return true;
                                }
                            }
                            result = false;
                            return walk_abort;
                        }
                        return true;
                    }
                    if (node instanceof AST_This && this instanceof AST_Arrow) {
                        result = false;
                        return walk_abort;
                    }
                });
                return result;
            }