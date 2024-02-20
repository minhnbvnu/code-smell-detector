function getParsedSourceMap(node) {
                if (node.parsedSourceMap === void 0 && node.sourceMapText !== void 0) {
                    node.parsedSourceMap = tryParseRawSourceMap(node.sourceMapText) || false;
                }
                return node.parsedSourceMap || void 0;
            }