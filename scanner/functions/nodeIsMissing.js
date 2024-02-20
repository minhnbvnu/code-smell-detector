function nodeIsMissing(node) {
            if (node === void 0) {
                return true;
            }
            return node.pos === node.end && node.pos >= 0 && node.kind !== 1 /* EndOfFileToken */;
        }