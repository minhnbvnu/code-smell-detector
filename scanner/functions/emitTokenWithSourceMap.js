function emitTokenWithSourceMap(node, token, writer2, tokenPos, emitCallback) {
                if (sourceMapsDisabled || node && isInJsonFile(node)) {
                    return emitCallback(token, writer2, tokenPos);
                }
                const emitNode = node && node.emitNode;
                const emitFlags = emitNode && emitNode.flags || 0 /* None */;
                const range = emitNode && emitNode.tokenSourceMapRanges && emitNode.tokenSourceMapRanges[token];
                const source = range && range.source || sourceMapSource;
                tokenPos = skipSourceTrivia(source, range ? range.pos : tokenPos);
                if ((emitFlags & 256 /* NoTokenLeadingSourceMaps */) === 0 && tokenPos >= 0) {
                    emitSourcePos(source, tokenPos);
                }
                tokenPos = emitCallback(token, writer2, tokenPos);
                if (range)
                    tokenPos = range.end;
                if ((emitFlags & 512 /* NoTokenTrailingSourceMaps */) === 0 && tokenPos >= 0) {
                    emitSourcePos(source, tokenPos);
                }
                return tokenPos;
            }