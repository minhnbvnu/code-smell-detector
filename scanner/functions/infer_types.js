function infer_types(node) {
        do {
            funct = global_funct;
            scope = global_scope;
            type_state_change = false;
            infer(node);
        } while (type_state_change);
    }