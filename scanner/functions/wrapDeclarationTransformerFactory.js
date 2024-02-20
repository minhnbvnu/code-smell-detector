function wrapDeclarationTransformerFactory(transformer) {
            return wrapCustomTransformerFactory(transformer, (_, node) => node);
        }