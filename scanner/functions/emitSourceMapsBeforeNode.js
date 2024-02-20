function emitSourceMapsBeforeNode(node) {
                const emitFlags = getEmitFlags(node);
                const sourceMapRange = getSourceMapRange(node);
                if (isUnparsedNode(node)) {
                    Debug.assertIsDefined(node.parent, "UnparsedNodes must have parent pointers");
                    const parsed = getParsedSourceMap(node.parent);
                    if (parsed && sourceMapGenerator) {
                        sourceMapGenerator.appendSourceMap(writer.getLine(), writer.getColumn(), parsed, node.parent.sourceMapPath, node.parent.getLineAndCharacterOfPosition(node.pos), node.parent.getLineAndCharacterOfPosition(node.end));
                    }
                }
                else {
                    const source = sourceMapRange.source || sourceMapSource;
                    if (node.kind !== 355 /* NotEmittedStatement */ && (emitFlags & 32 /* NoLeadingSourceMap */) === 0 && sourceMapRange.pos >= 0) {
                        emitSourcePos(sourceMapRange.source || sourceMapSource, skipSourceTrivia(source, sourceMapRange.pos));
                    }
                    if (emitFlags & 128 /* NoNestedSourceMaps */) {
                        sourceMapsDisabled = true;
                    }
                }
            }