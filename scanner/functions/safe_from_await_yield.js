function safe_from_await_yield(node, scope) {
            var avoid = avoid_await_yield(scope);
            if (!avoid) return true;
            var safe = true;
            var tw = new TreeWalker(function(node) {
                if (!safe) return true;
                if (node instanceof AST_Scope) {
                    if (node === fn) return;
                    if (is_arrow(node)) {
                        for (var i = 0; safe && i < node.argnames.length; i++) node.argnames[i].walk(tw);
                    } else if (node instanceof AST_LambdaDefinition && avoid[node.name.name]) {
                        safe = false;
                    }
                    return true;
                }
                if (node instanceof AST_Symbol && avoid[node.name] && node !== fn.name) safe = false;
            });
            node.walk(tw);
            return safe;
        }