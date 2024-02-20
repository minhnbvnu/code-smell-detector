function isNonJsxSameLineTokenContext(context) {
            return context.TokensAreOnSameLine() && context.contextNode.kind !== 11 /* JsxText */;
        }