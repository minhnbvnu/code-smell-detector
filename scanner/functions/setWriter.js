function setWriter(_writer, _sourceMapGenerator) {
                if (_writer && printerOptions.omitTrailingSemicolon) {
                    _writer = getTrailingSemicolonDeferringWriter(_writer);
                }
                writer = _writer;
                sourceMapGenerator = _sourceMapGenerator;
                sourceMapsDisabled = !writer || !sourceMapGenerator;
            }