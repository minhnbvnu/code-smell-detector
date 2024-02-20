function isStringOrNumericLiteral(node) {
            const kind = node.kind;
            return kind === 10 /* StringLiteral */ || kind === 8 /* NumericLiteral */;
        }