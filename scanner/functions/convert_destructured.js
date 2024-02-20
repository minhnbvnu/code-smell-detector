function convert_destructured(type, process) {
        return this.transform(new TreeTransformer(function(node, descend) {
            if (node instanceof AST_DefaultValue) {
                node = node.clone();
                node.name = node.name.transform(this);
                return node;
            }
            if (node instanceof AST_Destructured) {
                node = node.clone();
                descend(node, this);
                return node;
            }
            if (node instanceof AST_DestructuredKeyVal) {
                node = node.clone();
                node.value = node.value.transform(this);
                return node;
            }
            return node.convert_symbol(type, process);
        }));
    }