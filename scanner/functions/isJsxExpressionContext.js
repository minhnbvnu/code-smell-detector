function isJsxExpressionContext(context) {
            return context.contextNode.kind === 291 /* JsxExpression */ || context.contextNode.kind === 290 /* JsxSpreadAttribute */;
        }