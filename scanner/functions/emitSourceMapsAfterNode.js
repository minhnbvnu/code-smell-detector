function emitSourceMapsAfterNode(node) {
                const emitFlags = getEmitFlags(node);
                const sourceMapRange = getSourceMapRange(node);
                if (!isUnparsedNode(node)) {
                    if (emitFlags & 128 /* NoNestedSourceMaps */) {
                        sourceMapsDisabled = false;
                    }
                    if (node.kind !== 355 /* NotEmittedStatement */ && (emitFlags & 64 /* NoTrailingSourceMap */) === 0 && sourceMapRange.end >= 0) {
                        emitSourcePos(sourceMapRange.source || sourceMapSource, sourceMapRange.end);
                    }
                }
            }