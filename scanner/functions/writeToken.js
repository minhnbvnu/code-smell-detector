function writeToken(token, pos, writer2, contextNode) {
                return !sourceMapsDisabled ? emitTokenWithSourceMap(contextNode, token, writer2, pos, writeTokenText) : writeTokenText(token, writer2, pos);
            }