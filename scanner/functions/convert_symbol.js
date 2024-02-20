function convert_symbol(type, process) {
        var node = make_node(type, this, this);
        process(node, this);
        return node;
    }