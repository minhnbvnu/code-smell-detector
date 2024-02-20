function SourceMapper(tsFileName, jsFileName, jsFile, sourceMapOut, errorReporter) {
            this.jsFile = jsFile;
            this.sourceMapOut = sourceMapOut;
            this.errorReporter = errorReporter;
            this.sourceMappings = [];
            this.currentMappings = [];
            this.names = [];
            this.currentNameIndex = [];
            this.currentMappings.push(this.sourceMappings);
            jsFileName = TypeScript.switchToForwardSlashes(jsFileName);
            this.jsFileName = TypeScript.getPrettyName(jsFileName, false, true);
            var removalIndex = jsFileName.lastIndexOf(this.jsFileName);
            var fixedPath = jsFileName.substring(0, removalIndex);
            this.tsFileName = TypeScript.getRelativePathToFixedPath(fixedPath, tsFileName);
        }