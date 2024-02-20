function makeSynthetic(node) {
            node.flags |= 8 /* Synthesized */;
            return node;
        }