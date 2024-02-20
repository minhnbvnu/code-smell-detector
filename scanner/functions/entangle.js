function entangle(defun, scope) {
            if (defun === scope) return;
            node.mark_enclosed(options);
            var def = scope.find_variable(node.name);
            if (node.thedef === def) return;
            node.thedef = def;
            def.orig.push(node);
            node.mark_enclosed(options);
        }