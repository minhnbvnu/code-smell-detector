function isNonJsxElementOrFragmentContext(context) {
            return context.contextNode.kind !== 281 /* JsxElement */ && context.contextNode.kind !== 285 /* JsxFragment */;
        }