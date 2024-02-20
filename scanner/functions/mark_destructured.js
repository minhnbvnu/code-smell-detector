function mark_destructured(process, tw) {
        var marker = new TreeWalker(function(node) {
            if (node instanceof AST_DefaultValue) {
                node.value.walk(tw);
                node.name.walk(marker);
                return true;
            }
            if (node instanceof AST_DestructuredKeyVal) {
                if (node.key instanceof AST_Node) node.key.walk(tw);
                node.value.walk(marker);
                return true;
            }
            return process(node);
        });
        this.walk(marker);
    }