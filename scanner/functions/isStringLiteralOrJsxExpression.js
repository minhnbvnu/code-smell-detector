function isStringLiteralOrJsxExpression(node) {
            const kind = node.kind;
            return kind === 10 /* StringLiteral */ || kind === 291 /* JsxExpression */;
        }