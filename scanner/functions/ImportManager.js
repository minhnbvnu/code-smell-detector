function ImportManager(less, context, rootFileInfo) {
                this.less = less;
                this.rootFilename = rootFileInfo.filename;
                this.paths = context.paths || []; // Search paths, when importing
                this.contents = {}; // map - filename to contents of all the files
                this.contentsIgnoredChars = {}; // map - filename to lines at the beginning of each file to ignore
                this.mime = context.mime;
                this.error = null;
                this.context = context;
                // Deprecated? Unused outside of here, could be useful.
                this.queue = []; // Files which haven't been imported yet
                this.files = {}; // Holds the imported parse trees.
            }