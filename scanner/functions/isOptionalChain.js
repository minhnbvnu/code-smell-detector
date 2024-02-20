function isOptionalChain(node) {
            const kind = node.kind;
            return !!(node.flags & 32 /* OptionalChain */) && (kind === 208 /* PropertyAccessExpression */ || kind === 209 /* ElementAccessExpression */ || kind === 210 /* CallExpression */ || kind === 232 /* NonNullExpression */);
        }