function safe_from_assignment(node) {
            if (node.has_side_effects(compressor)) return;
            var hit = false;
            node.walk(new TreeWalker(function(node) {
                if (hit) return true;
                if (node instanceof AST_SymbolRef && node.definition() === def) return hit = true;
            }));
            return !hit;
        }