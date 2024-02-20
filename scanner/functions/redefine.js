function redefine(node, scope) {
        var name = node.name;
        var old_def = node.thedef;
        if (!all(old_def.orig, function(sym) {
            return !(sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet);
        })) return false;
        var new_def = scope.find_variable(name);
        if (new_def) {
            var redef = new_def.redefined();
            if (redef) new_def = redef;
        } else {
            new_def = self.globals.get(name);
        }
        if (new_def) {
            new_def.orig.push(node);
        } else {
            new_def = scope.def_variable(node);
        }
        if (new_def.undeclared) self.variables.set(name, new_def);
        if (name == "arguments" && is_arguments(old_def) && node instanceof AST_SymbolLambda) return true;
        old_def.defun = new_def.scope;
        old_def.forEach(function(node) {
            node.redef = old_def;
            node.thedef = new_def;
            node.reference(options);
        });
        return true;
    }