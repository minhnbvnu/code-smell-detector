function getRootDeclaration(node) {
            while (node.kind === 205 /* BindingElement */) {
                node = node.parent.parent;
            }
            return node;
        }