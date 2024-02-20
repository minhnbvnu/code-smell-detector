function visitJsxText(node) {
                const fixed = fixupWhitespaceAndDecodeEntities(node.text);
                return fixed === void 0 ? void 0 : factory2.createStringLiteral(fixed);
            }