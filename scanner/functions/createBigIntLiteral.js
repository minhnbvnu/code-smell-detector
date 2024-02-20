function createBigIntLiteral(value) {
                const node = createBaseToken(9 /* BigIntLiteral */);
                node.text = typeof value === "string" ? value : pseudoBigIntToString(value) + "n";
                node.transformFlags |= 4 /* ContainsESNext */;
                return node;
            }