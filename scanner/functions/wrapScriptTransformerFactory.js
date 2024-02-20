function wrapScriptTransformerFactory(transformer) {
            return wrapCustomTransformerFactory(transformer, chainBundle);
        }