function indexOf_assign(def, node) {
            var nodes = assign_in_use[def.id];
            return nodes && nodes.indexOf(node);
        }