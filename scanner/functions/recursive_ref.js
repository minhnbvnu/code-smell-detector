function recursive_ref(compressor, def, fn) {
        var level = 0, node = compressor.self();
        do {
            if (node === fn) return node;
            if (is_lambda(node) && node.name && node.name.definition() === def) return node;
        } while (node = compressor.parent(level++));
    }