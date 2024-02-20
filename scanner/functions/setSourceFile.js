function setSourceFile(sourceFile) {
                currentSourceFile = sourceFile;
                currentLineMap = void 0;
                detachedCommentsInfo = void 0;
                if (sourceFile) {
                    setSourceMapSource(sourceFile);
                }
            }