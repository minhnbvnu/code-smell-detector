function SourceMapOutput(options) {
                this._css = [];
                this._rootNode = options.rootNode;
                this._contentsMap = options.contentsMap;
                this._contentsIgnoredCharsMap = options.contentsIgnoredCharsMap;
                if (options.sourceMapFilename) {
                    this._sourceMapFilename = options.sourceMapFilename.replace(/\\/g, '/');
                }
                this._outputFilename = options.outputFilename;
                this.sourceMapURL = options.sourceMapURL;
                if (options.sourceMapBasepath) {
                    this._sourceMapBasepath = options.sourceMapBasepath.replace(/\\/g, '/');
                }
                if (options.sourceMapRootpath) {
                    this._sourceMapRootpath = options.sourceMapRootpath.replace(/\\/g, '/');
                    if (this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) !== '/') {
                        this._sourceMapRootpath += '/';
                    }
                }
                else {
                    this._sourceMapRootpath = '';
                }
                this._outputSourceFiles = options.outputSourceFiles;
                this._sourceMapGeneratorConstructor = environment.getSourceMapGenerator();
                this._lineNumber = 0;
                this._column = 0;
            }