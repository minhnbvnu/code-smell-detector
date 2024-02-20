function wrapCustomTransformer(transformer) {
            return (node) => isBundle(node) ? transformer.transformBundle(node) : transformer.transformSourceFile(node);
        }