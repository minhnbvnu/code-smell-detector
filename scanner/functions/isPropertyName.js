function isPropertyName(node) {
            const kind = node.kind;
            return kind === 79 /* Identifier */ || kind === 80 /* PrivateIdentifier */ || kind === 10 /* StringLiteral */ || kind === 8 /* NumericLiteral */ || kind === 164 /* ComputedPropertyName */;
        }