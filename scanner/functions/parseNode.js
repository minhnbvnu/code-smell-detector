function parseNode(str, parseList, currentIndex, fileInfo, callback) {
            var result;
            var returnNodes = [];
            var parser = parserInput;
            try {
                parser.start(str, false, function fail(msg, index) {
                    callback({
                        message: msg,
                        index: index + currentIndex
                    });
                });
                for (var x = 0, p = void 0, i = void 0; (p = parseList[x]); x++) {
                    i = parser.i;
                    result = parsers[p]();
                    if (result) {
                        try {
                            result._index = i + currentIndex;
                            result._fileInfo = fileInfo;
                        }
                        catch (e) { }
                        returnNodes.push(result);
                    }
                    else {
                        returnNodes.push(null);
                    }
                }
                var endInfo = parser.end();
                if (endInfo.isFinished) {
                    callback(null, returnNodes);
                }
                else {
                    callback(true, null);
                }
            }
            catch (e) {
                throw new less_error_1.default({
                    index: e.index + currentIndex,
                    message: e.message
                }, imports, fileInfo.filename);
            }
        }