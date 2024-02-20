function emitSourcePos(source, pos) {
                if (source !== sourceMapSource) {
                    const savedSourceMapSource = sourceMapSource;
                    const savedSourceMapSourceIndex = sourceMapSourceIndex;
                    setSourceMapSource(source);
                    emitPos(pos);
                    resetSourceMapSource(savedSourceMapSource, savedSourceMapSourceIndex);
                }
                else {
                    emitPos(pos);
                }
            }