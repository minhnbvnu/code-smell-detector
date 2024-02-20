function setSourceMapSource(source) {
                if (sourceMapsDisabled) {
                    return;
                }
                sourceMapSource = source;
                if (source === mostRecentlyAddedSourceMapSource) {
                    sourceMapSourceIndex = mostRecentlyAddedSourceMapSourceIndex;
                    return;
                }
                if (isJsonSourceMapSource(source)) {
                    return;
                }
                sourceMapSourceIndex = sourceMapGenerator.addSource(source.fileName);
                if (printerOptions.inlineSources) {
                    sourceMapGenerator.setSourceContent(sourceMapSourceIndex, source.text);
                }
                mostRecentlyAddedSourceMapSource = source;
                mostRecentlyAddedSourceMapSourceIndex = sourceMapSourceIndex;
            }