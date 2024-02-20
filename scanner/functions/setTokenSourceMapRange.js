function setTokenSourceMapRange(node, token, range) {
            var _a2;
            const emitNode = getOrCreateEmitNode(node);
            const tokenSourceMapRanges = (_a2 = emitNode.tokenSourceMapRanges) != null ? _a2 : emitNode.tokenSourceMapRanges = [];
            tokenSourceMapRanges[token] = range;
            return node;
        }