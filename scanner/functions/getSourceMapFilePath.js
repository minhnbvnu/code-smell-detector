function getSourceMapFilePath(jsFilePath, options) {
            return options.sourceMap && !options.inlineSourceMap ? jsFilePath + ".map" : void 0;
        }